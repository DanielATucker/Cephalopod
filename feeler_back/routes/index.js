// Allow require
import { createRequire } from "module";
const require = createRequire(import.meta.url);


var express = require('express');
var router = express.Router();
  
/* GET home page. */
router.get('/', (req, res) => {
  res.send('INDEX')
});

export default router;

