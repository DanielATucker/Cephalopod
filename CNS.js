// Allow require
import { createRequire } from "module";
const require = createRequire(import.meta.url);

import * as http from 'http'; //ES 6
const Gun = require('gun');


export default function CNS() {
  var startGunServer = require('gun-server');
  var gun = startGunServer();

  var server = require('gun-server');

  server({
    handler: function (request, response) {
      // request handler (optional)
    },
    port: 3006, // default, optional
    server: new http.Server(), // optional
    options: {
      // this is passed to the gun constructor
  
      file: 'data.json' // default
    }
  });
};