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
    let properties = response.properties;

    let username = properties.name;

    console.log(`Node: ${response.json()}`)
    console.log(`Properties: ${properties}`);
    console.log(`Username: ${username}`);

    res.json({"USERNAME": username});
  });
});

export default router;
