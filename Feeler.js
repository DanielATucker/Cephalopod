import { io } from "socket.io-client";
import { parse } from "cookie";

// Allow require
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const prompt = require("prompt-sync")({ sigint: true });

var blessed = require('blessed')
, contrib = require('blessed-contrib')
, screen = blessed.screen()
, grid = new contrib.grid({rows: 8, cols: 8, screen: screen})

import timeBox from "./Cephalopod_modules/timeBox.js";
import statsBox from "./Cephalopod_modules/statsBox.js";
import terminalBox from "./Cephalopod_modules/terminalBox.js";

/*
function main() {
  // Quit on Escape, q, or Control-C.
  screen.key(['escape', 'q', 'C-c'], function(ch, key) {
    return process.exit(0);
  });
  
  let Timebox = timeBox(grid, screen)
  let StatsBox = statsBox(grid, screen)
  let TerminalBox = terminalBox(grid, screen)

  //TerminalBox.log("TEST")
}

main()
*/


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

socket.on('connect', async function (data) {
  await new Promise(resolve => setTimeout(resolve, 5000));

  
  console.log('Connected!');
  console.log("Enter Your Username"); 
  let username = prompt(">>");
  
  socket.emit("username", username)
});

socket.on('req_password', function (data) {
  console.log("Password?")
  let password = prompt(">>");
  socket.emit("user_password", password);
  console.log("you have logged in");
});

socket.on("message", (Message) => {
  console.log(Message)
});

socket.on("private_message", (Message) => {
  Message = JSON.parse(Message);
  console.log(Message);
});