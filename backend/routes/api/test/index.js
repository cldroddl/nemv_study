const express = require('express');
const router = express.Router();
const createError = require('http-errors')

/*
 * res.send 는 응답을 json이나 문자열로 보내는 것인고
 * res.render 는 pug 페이지를 그리는 것이다.
 */
/* GET users listing. */
router.get('/', function(req, res) {
  const testData = [
    {
      name: '김김김',
      age: 14
    },
    {
      name: '이이이',
      age: 24
    }
  ]
  res.send({ testData: testData })
});

// get 뿐만이 아니라 모든 요청 verb 에 대해서 처리
router.all('*', function(req, res, next) {
  next(createError(404, '그런 test 없어요'))
});

module.exports = router;
