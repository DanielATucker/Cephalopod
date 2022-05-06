// Imports

import { Server } from 'socket.io'; 
import * as celery_client from 'celery-node';
import * as celery from 'celery-node';
import { io as Server_io } from 'socket.io-client';
import express from 'express';
import http from 'http';
import { dirname  as __dirname } from 'path';
import path from 'path';
import {fileURLToPath} from 'url';


// Init celery Server

const worker = celery.createWorker(
	'amqp://myuser:mypassword@localhost:5672/myvhost',
	'redis://localhost:6379/0'
);


//Init celery client (to call other workers)

const client = celery_client.createClient(
  "amqp://myuser:mypassword@localhost:5672/myvhost",
  "redis://localhost:6379/0"
);


//  Worker to start Socketio Server

worker.register("tasks.start_server", async () => {
	
	//init  Socketio Server
	
	const http_app = express();                
	const server = http.createServer(http_app);
	const io = new Server(server);             


	// Http file to serve
	http_app.get('/', (req, res) => {

		const __filename = fileURLToPath(import.meta.url);
		const __dirname = path.dirname(__filename);
		res.sendFile(__dirname + '/Cephalopod-Web/index.html');
	});
	
	io.on("connection", (socket) => {
		
		console.log('a user connected');

		socket.join("Lobby");
		
		var userId = socket.id; 


		io.to(userId).emit("message", "Welcome to Caphalopod, your user id is " + userId );
		
		io.to("Lobby").emit("message", "User Id " + userId + " has joined the server");


		socket.on('disconnect', () => {
			console.log('User disconnected');
		});


		socket.on('chat message', (msg) =>{
			console.log('Message: ' + msg);
			io.emit("message", msg);
		});

	});

	io.on("message", (data) => {
			console.log(data);
			socket.emit("message", data);
	});

	console.log("");

	server.listen(5000, () => {
		console.log('listening on *:5000');
	});

});

// Init Server client

worker.register("tasks.Server_client", async () => { 
	
	const Server_socket = Server_io("ws://localhost:5000");

	Server_socket.on("message", (data) => {
		console.log("For Server: " + data);
	});


	Server_socket.on("connection", function(socket){
		print("Server client connected")	
	});

	
	Server_socket.on("disconnect", function(socket){
		socket.disconnect();
	});

	console.log("");

});


worker.start();
