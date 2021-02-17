const express = require('express');
const router = express.Router();
const createError = require('http-errors')

/*
 * res.send 는 응답을 json이나 문자열로 보내는 것인고
 * res.render 는 pug 페이지를 그리는 것이다.
 */
/* GET users listing. */
router.get('/hello', function(req, res, next) {
  res.send({message: 'hello', a: 1});
});

router.get('/', function(req, res, next) {
  res.send('ap i response');
});

// get 뿐만이 아니라 모든 요청 verb 에 대해서 처리
router.all('*', function(req, res, next) {
  next(createError(404, '그런 api 없어요'))
});

module.exports = router;
