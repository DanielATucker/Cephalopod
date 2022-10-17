// Allow require
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const SerAny = require('serialize-anything');
import { createServer } from "http";
import { Server } from 'socket.io';
import express from 'express'; 
import session from "express-session";
import { io as Server_io } from 'socket.io-client';

// Cephalopod modules

import User_list from './Cephalopod_modules/User_list.js'


var Users = new User_list();

function init() {
	//init  Socketio Server

	const app = express();
	const httpServer = createServer(app);

	const sessionMiddleware = session({
		secret: "a",
		resave: false,
		saveUninitialized: false
	});

	const io = new Server(httpServer, {
		cors: {
			origin: "100.69.19.3:3000",
			methods: ["GET", "POST"]
		},
	
		allowRequest: (req, callback) => {

			// with HTTP long-polling, we have access to the HTTP response here, but this is not

			// the case with WebSocket, so we provide a dummy response object

			const fakeRes = {
				
				getHeader() {
					return [];
				},
				
				setHeader(key, values) {

					req.cookieHolder = values[0];
				},

				writeHead() {},
			};

			sessionMiddleware(req, fakeRes, () => {

				if (req.session) {

					// trigger the setHeader() above

					fakeRes.writeHead();

					// manually save the session (normally triggered by res.end())

					req.session.save();
				}

				callback(null, true);
			});
		},
	});

	io.engine.on("initial_headers", (headers, req) => {
		if (req.cookieHolder) {

			headers["set-cookie"] = req.cookieHolder;

			delete req.cookieHolder;
		}
	});
		
	start(httpServer);
	
	init_events(io);
}

class user {
	constructor(username, user_id) {
		this.username = username;
		this.sid = user_id;
	}
}

function init_events(io) {
	io.on("connection", (socket) => {
		const req = socket.request;
		const session = socket.request.session;

		session.user_id = socket.id;

		socket.join(socket.id);

		io.sockets.to(socket.id).emit("message", "Welcome to the server!")

		socket.on("private_message", (Message) => {

			Message = JSON.parse(Message);

			var recipient = Message["recipient"];

			recipient = username_to_id(io, socket, recipient)
			
			io.sockets.to(recipient).emit("private_message", Message)

		});

		socket.on("message", (message) => {

			socket.emit(message)
			console.log(message)
		});
	
		socket.on("username", (username) => {

			var user2 = new user(username, session.user_id)
			Users[user2.username] = user2;

			console.log(Users);
			
			socket.emit("users", Users);
			
			session.username = username;
			socket.username = username; 

			session.save();

			io.sockets.to(session.user_id).emit("req_password")
		});

		socket.on("Brain_password", (password) => {

			req.session.password = password;

			req.session.save();

			if (password == "BrainPassword") {

				socket.emit("message", "You are authenticated!")

			}
			else {
				socket.emit("message", "Wrong Brain Password, Please contact an administrator")
				console.log("Wrong Brain Password")
			}
		});

		socket.on("user_password", (password) => {
			var BrainID = username_to_id(io, socket, "Brain")
			socket.to(BrainID).emit("user_auth", req.session.username, password)
		});

		socket.on("auth_success", (username) => {
			var recipient = username_to_id(io, socket, username)

			io.sockets.to(recipient).emit("auth_successful")
			
			console.log(username + " has joined the server")
		});

	});
}

function username_to_id(io, socket, username) {
	for (const user in Users) {
		if (username == user){

			return Users[username]["sid"]

		}
	}
}

function start(httpServer) {
	const PORT = 3000;

	httpServer.listen(PORT, () =>
		console.log(`server listening at http://localhost:${PORT}`)
	);
}

init();
