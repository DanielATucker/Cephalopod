// Allow require
import { createRequire } from "module";
const require = createRequire(import.meta.url);


const GUN = require('gun/gun');

export default function CNS() { 

  let startServer = function() {
    let gun = GUN();
    
    let alice = gun.get('alice');

    alice.on(function(node){
      console.log('Subscribed to Alice!', node);
    });
  }

  startServer();
};