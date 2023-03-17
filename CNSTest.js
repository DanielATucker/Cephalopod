// Allow require
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const GUN = require('gun');

let gun = GUN({
    "peers": ["localhost:8765"]
});

let alice = gun.get('alice');

alice.on(function(node){
    console.log('Alice Updated: ', node);
});

gun.get('alice').once(function(node){
    console.log('Alice in:', node);
});