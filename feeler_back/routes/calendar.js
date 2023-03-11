// Allow require
import { createRequire } from "module";
const require = createRequire(import.meta.url);


var express = require('express');
var router = express.Router();
  
/* GET home page. */
router.get('/add_event', (req, res) => {
  res.send('working')
});

router.get('/get_events', (req, res) => {
    res.json('working')
  });

export default router;