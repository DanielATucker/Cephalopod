import { io } from "socket.io-client";
import { parse } from "cookie";

// Allow require
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const prompt = require("prompt-sync")({ sigint: true });

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

socket.on('connect', async function () {
  await new Promise(resolve => setTimeout(resolve, 5000));

  console.log('Connected!');
  console.log("Enter Your Username"); 
  let username = prompt(">>");

  socket.emit("username", username)
});

socket.on('req_password',  () => {
  console.log("Password?")
  let password = prompt.hide(">>");
  socket.emit("user_password", password);
});

socket.on("auth_success", () => {
  console.log("you have logged in");
});

socket.on("message", (Message) => {
  console.log(Message)
});

socket.on("private_message", (Message) => {
  Message = JSON.parse(Message);
  console.log(Message);
});