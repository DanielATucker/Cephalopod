var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.type('application/json');
  res.json({"USERNAME": "USERNAME"});
});

module.exports = router;