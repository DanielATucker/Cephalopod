import GUN from "https://cdn.skypack.dev/gun";


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

startServer= () => {
  gun = GUN();
};

startServer();