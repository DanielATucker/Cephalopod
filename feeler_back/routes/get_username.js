var express = require('express');
var router = express.Router();

import Database from "../components/Database.js"

/* GET home page. */
router.get('/', function(req, res, next) {

  let username_raw = Database("MATCH (n) RETURN (n)");

  let username = username_raw.properties.name;

  res.json({"USERNAME": username});
});

module.exports = router;