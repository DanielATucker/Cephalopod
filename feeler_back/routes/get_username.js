var express = require('express');
var router = express.Router();

var Database = require("../components/Database.js")

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("TEST")
  let username_raw = Database("MATCH (n) RETURN (n)");

  let username = username_raw.properties.name;
  
  res.json({"USERNAME": username});
});

module.exports = router;