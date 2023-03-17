// Allow require
import { createRequire } from "module";
const require = createRequire(import.meta.url);

import GUN from "gun";


var WebSocketServer = require('ws').Server
, wss = new WebSocketServer({ port: 3006 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received:', message);
  });
  var count = 0;
  setInterval(function(){
    count += 1;
    ws.send('hello world ' + count);
  }, 1000);
});

let startServer = function() {
  let gun = GUN();
}

startServer();