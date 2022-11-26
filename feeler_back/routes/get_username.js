// Allow require
import { response } from "express";
import { createRequire } from "module";
import { userInfo } from "os";
const require = createRequire(import.meta.url);

import Database from "../components/Database.js";


var express = require('express');

var router = express.Router();

router.get('/', function(req, res, next) {
  let nodePromise = Database("MATCH (n) RETURN (n)");

  nodePromise.then((response) => {
    if ((typeof response !== 'undefined') && ( response != null)) {
      if ((typeof response == "string") && (response == "No Database found")) {
        res.json({
          "isDatabaseOnline":"No Database found"
        });
      };

      let properties = response.properties;

      let username = properties.name;

      res.json({"USERNAME": username});
    }
    else {
      res.json({"USERNAME": "No User Found in database"});

    }
  });
});

export default router;
