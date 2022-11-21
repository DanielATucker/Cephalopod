// Allow require
import { createRequire } from "module";
const require = createRequire(import.meta.url);


export default function indexRouter() {

  var express = require('express');
  var router = express.Router();

  router.use(function (req, res) {
    console.log("index test");
  })
  
  /* GET home page. */
  router.get('/', (req, res) => {
    res.send('INDEX')
  });
}
