// Allow require
import { response } from "express";
import { createRequire } from "module";
import { userInfo } from "os";
const require = createRequire(import.meta.url);

import Database from "../components/Database.js";


var express = require('express');

var router = express.Router();


router.post('/', function (req, res) {    
  let username = req.body.username;

  let password = req.body.password;

  let nodePromise = Database(`MATCH (n: User) WHERE n.name = '${username}' AND n.password = '${password}' RETURN (n.name)`);

  nodePromise.then((response) => {
    if ((typeof response !== 'undefined') && ( response != null)) {
      if ((typeof response == "string") && (response == "No Database found")) {
        res.json({
          "USERNAME":"No Database found"
        });
      }
      else {
        console.log(`Response ${JSON.stringify(response)}`);
        console.log(`Username Submitted ${username}`)

        res.json({"USERNAME": response});
      };
    }
    else {
      res.json({"USERNAME": "Username not Found in database"});
    }
  });
});

export default router;
