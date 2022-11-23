// Allow require
import { createRequire } from "module";
import { userInfo } from "os";
const require = createRequire(import.meta.url);

import Database from "../components/Database.js";


var express = require('express');

var router = express.Router();

router.get('/', function(req, res, next) {
  let result = Database("MATCH (n) RETURN (n)");

  let properties = result.properties;
  
  let username = properties.name;

  console.log(properties)
  console.log(username);

  res.json({"USERNAME": username});
});

export default router;
