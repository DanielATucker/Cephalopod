// Allow require
import { createRequire } from "module";
const require = createRequire(import.meta.url);

import { io } from "socket.io-client";
import { parse } from "cookie";

var term = require( 'terminal-kit' ).terminal ;

import { graph_init } from "./Cephalopod_modules/Cephalopod_Brain/main/graph_init.js";
import { auth } from "./Cephalopod_modules/Cephalopod_Brain/main/auth.js";

const socket = io("http://localhost:3000");
const COOKIE_NAME = "a";

let sender_info = null;

socket.io.on("open", () => {
  socket.io.engine.transport.on("pollComplete", () => {
    const request = socket.io.engine.transport.pollXhr.xhr;
    const cookieHeader = request.getResponseHeader("set-cookie");
    if (!cookieHeader) {
      return;
    }
    cookieHeader.forEach(cookieString => {
      if (cookieString.includes(`${COOKIE_NAME}=`)) {
        const cookie = parse(cookieString);
        socket.io.opts.extraHeaders = {
          cookie: `${COOKIE_NAME}=${cookie[COOKIE_NAME]}`
        }
      }
    });
  });

  let sender_info = {
    "sender": "Brain",
    "sender_id": socket.id
  }
});

socket.on('connect', () => {
    console.log('Connected!');
    socket.emit("username", "Brain")
});

socket.on('req_password', () => {
    socket.emit("Brain_password", "BrainPassword")
    socket.emit("message", "Brain is online @ " + socket.id)
});

socket.on('user_auth', (sender, username, password) => {
  let graph = graph_init();

  auth(socket, graph, sender_info, username, password);
});

socket.on("message", (Message) => {
  console.log(Message);
});

socket.on("private_message", (Message) => {
  Message = JSON.parse(Message);
  console.log(Message);
});