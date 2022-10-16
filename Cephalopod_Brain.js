import { io } from "socket.io-client";
import { parse } from "cookie";

// Allow require
import { createRequire } from "module";
const require = createRequire(import.meta.url);

var term = require( 'terminal-kit' ).terminal ;


const socket = io("http://localhost:3000");
const COOKIE_NAME = "a";

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
});

socket.on('connect', function (data) {
    console.log('Connected!');
    socket.emit("username", "Brain")
});

socket.on('req_password', function (data) {
    socket.emit("Brain_password", "BrainPassword")
    socket.emit("message", "Brain is online @ " + socket.id)
});

socket.on('user_auth', (username, password) => {
  console.log(username)
  console.log(password)
});

socket.on("message", (Message) => {
  console.log(Message);
});

socket.on("private_message", (Message) => {
  Message = JSON.parse(Message);
  console.log(Message);
});

