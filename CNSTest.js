// Allow require
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const GUN = require('gun');

let gun = GUN("localhost:3006/gun");
let alice = gun.get('alice');

alice.on(function(node){
    console.log('Alice Updated: ', node);
});