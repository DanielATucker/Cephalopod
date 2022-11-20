var express = require('express');
var Router = express.Router();

var Database = require("../components/Database.js")

/* GET home page. */
Router.get('/', function(req, res, next) {

  let username_raw = Database("MATCH (n) RETURN (n)");

  let username = username_raw.properties.name;
  
  res.json({"USERNAME": username});
});

module.exports = Router;