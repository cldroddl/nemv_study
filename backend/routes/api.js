const express = require('express');
const router = express.Router();

/*
 * res.send 는 응답을 json이나 문자열로 보내는 것인고
 * res.render 는 pug 페이지를 그리는 것이다.
 */
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('ap i response');
});

module.exports = router;
