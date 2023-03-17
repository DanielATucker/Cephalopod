// Allow require
import { createRequire } from "module";
const require = createRequire(import.meta.url);

import * as http from 'http'; //ES 6
const Gun = require('gun');


export default function CNS() {
  let startServer = function() {
    var server = require('http').createServer().listen(8080);
    
    var gun = Gun({web: server});
  };

  startServer();
};