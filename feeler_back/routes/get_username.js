// Allow require
import { createRequire } from "module";
const require = createRequire(import.meta.url);

import Database from "../components/Database.js";


var express = require('express');

var router = express.Router();

router.get('/', function(req, res, next) {
  let username_raw = Database("MATCH (n) RETURN (n)");

  let username = username_raw.properties.name;
    
  res.json({"USERNAME": username});
});

export default router;
