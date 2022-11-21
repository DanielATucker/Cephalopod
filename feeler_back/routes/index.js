// Allow require
import { createRequire } from "module";
const require = createRequire(import.meta.url);


export default function indexRouter() {
  console.log("index test");

  var express = require('express');
  var router = express.Router();

  /* GET home page. */
  router.get('/', function(req, res, next) {
    res.send("API is working properly");
  });
}
