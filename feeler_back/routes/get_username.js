// Allow require
import { createRequire } from "module";
import { userInfo } from "os";
const require = createRequire(import.meta.url);

import Database from "../components/Database.js";


var express = require('express');

var router = express.Router();

router.get('/', function(req, res, next) {
  let node = Database("MATCH (n) RETURN (n)");

  let username = node.properties.name;
  console.log(`Node!! ${node}`);
  console.log((`NAME: ${username}`));

  res.json({"USERNAME": username});
});

export default router;
