// Allow require
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const SerAny = require('serialize-anything');
import { createServer } from "https";
import { Server } from 'socket.io';
import express from 'express'; 
import session from "express-session";
import { io as Server_io } from 'socket.io-client';
import { readFileSync } from "fs";

var cookieSession = require('cookie-session');

import { exec } from "node:child_process";

// Cephalopod modules
import User_list from './Cephalopod_modules/User_list.js'


var Users = new User_list();
let admin_list = [];

const app = express();

function init() {
	//init  Socketio Server

	app.use(session({ secret: 'a',  cookie: {maxAge: 24 * 60 * 60 * 1000}}));
	

	const httpServer = createServer({
		key: readFileSync("./ssl/Nerves_key.pem"),
		cert: readFileSync("./ssl/Nerves_cert.pem")
	}, app);


	const io = new Server(httpServer, {
		cors: {
			origin: `*`,
		}
	});
		
	start(httpServer);
	
	init_events(io);

	exec('python3 stats.py');
}

class user {
	constructor(username, user_id) {
		this.username = username;
		this.sid = user_id;
	}
}

function init_events(io) {
	io.on("connection", (socket) => {
		console.log(`SOCKET ${JSON.stringify(socket, null, 2)}`);

		const req = socket.request;
		const session = socket.request.session;

		session.user_id = socket.id;

		socket.join(socket.id);

		io.sockets.to(socket.id).emit("message", "Welcome to the server!");

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

			io.sockets.to(session.user_id).emit("req_password");

			if (username === "Daniel") {
				let admin_name = username;
				let admin_id = username_to_id(io, socket, username);
				
				let admin_data = {
					"Admin_name": admin_name,
					"Admin_id": admin_id
				}
				admin_list.push(admin_data);
			}
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

		socket.on("stats", (data) => {
		  if (typeof admin_list[0] !="undefined") {
		    let admin = admin_list[0]
		   
		    let admin_id = admin.Admin_id
		    
		    socket.to(admin_id).emit("stats", data)		
		  }

				
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
		console.log(`server listening at https://localhost:${PORT}`)
	);
}

init();
