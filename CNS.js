// Allow require
import { createRequire } from "module";
const require = createRequire(import.meta.url);

var fs = require('fs');
import GUN from "gun";


var WebSocketServer = require('ws').Server;

export default function CNS() { 
  var options = {
    key:fs.readFileSync('./ssl/Nerves.key'),
    cert:fs.readFileSync('./ssl/Nerves_cert.pem')
  };
  
  var server = https.createServer(
    options
    , function(req,res) {
      res.writeHeader(200);
      res.end();
    }
  );
  
  server.listen(3006);


  var wss = new ws({httpServer:server});

  console.log(`CNS Online`)

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
};