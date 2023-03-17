// Allow require
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const express = require('express')
const Gun = require('gun')


export default function CNS() {
  let startServer = function() {
    const app = express()
    const port = 8000

    app.use(Gun.serve)

    const server = app.listen(port, () => {
      console.log("Listening at: http://localhost://" + port)
    });

    Gun({web: server});
    
    let alice = Gun.get('alice');

    alice.on(function(node){
      console.log('Alice Updated: ', node);
    });
  }

  startServer();
};