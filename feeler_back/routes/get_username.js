var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({"USERNAME": "USERNAME"});
});

module.exports = router;