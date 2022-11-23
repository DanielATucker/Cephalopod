// Allow require
import { createRequire } from "module";
const require = createRequire(import.meta.url);


var express = require('express');

var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

export default router;
