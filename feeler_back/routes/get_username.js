// Allow require
import { createRequire } from "module";
const require = createRequire(import.meta.url);

import Database from "../components/Database.js";


export default function GetUsernameRouter() {
  var express = require('express');
  var router = express.Router();

  /* GET home page. */
  console.log("TEST")

  router.get('/', function(req, res, next) {

    console.log("TEST2")

    let username_raw = Database("MATCH (n) RETURN (n)");

    let username = username_raw.properties.name;
    
    res.json({"USERNAME": username});

    console.log("TEST3")
  });
}
