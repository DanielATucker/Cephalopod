// Allow require
import { createRequire } from "module";
const require = createRequire(import.meta.url);

import Database from "../components/Database.js"


export default function GetUsernameRouter() {

  var express = require('express');
  var router = express.Router();
    /* GET home page. */
  router.get('/', function(req, res, next) {

    let username_raw = Database("MATCH (n) RETURN (n)");

    let username = username_raw.properties.name;

    console.log(`Username ${username}`);

    res.json({"USERNAME": username});
  });
}
