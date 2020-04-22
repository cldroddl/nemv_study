var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('I\'m, api');
});

module.exports = router;