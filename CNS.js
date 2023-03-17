// Allow require
import { createRequire } from "module";
const require = createRequire(import.meta.url);


const GUN = require('gun');

export default function CNS() { 

  let startServer = function() {
    let gun = GUN();
    
    let alice = gun.get('alice');

    alice.on(function(node){
      console.log('Alice Updated: ', node);
    });
  }

  startServer();
};