// Allow require
import { createRequire } from "module";
const require = createRequire(import.meta.url);


import GUN from "gun";

export default function CNS() { 

  let startServer = function() {
    let gun = GUN();
  }

  startServer();
};