// Allow require
import { createRequire } from "module";
const require = createRequire(import.meta.url);

import Database from "../components/Database.js";


var express = require('express');

var router = express.Router();

router.get('/', function(req, res, next) {
  let username_raw = Database("MATCH (n) RETURN (n)");

  let properties = username_raw
  
  let username = username_raw.properties[0].name;

  console.log(properties);

  res.json({"USERNAME": username});
});

export default router;
