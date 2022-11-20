// Allow require
import { createRequire } from "module";
const require = createRequire(import.meta.url);


export default function UsersRouter() {
  var express = require('express');
  var router = express.Router();

  /* GET users listing. */
  router.get('/', function(req, res, next) {
    res.send('respond with a resource');
  });
}
