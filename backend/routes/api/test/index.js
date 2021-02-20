const express = require('express');
const router = express.Router();
const createError = require('http-errors')

/*
 * res.send 는 응답을 json이나 문자열로 보내는 것인고
 * res.render 는 pug 페이지를 그리는 것이다.
 */
/* GET users listing. */
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

router.get('/', function(req, res) {
  res.send({ testData: testData })
});

router.get('/req', function(req, res) {
  console.log(req.query)
  console.log(req.body)

  res.send({testData: testData})
})

router.post('/req', (req, res) => {
  console.log(req.query)
  console.log(req.body)
  res.send({success: true, msg: 'post ok'})
})

router.put('/req', (req, res) => {
  console.log(req.query)
  console.log(req.body)
  res.send({success: true, msg: 'put ok'})
})

router.delete('/req', (req, res) => {
  console.log(req.query)
  console.log(req.body)
  res.send({success: true, msg: 'del ok'})
})

// get 뿐만이 아니라 모든 요청 verb 에 대해서 처리
router.all('*', function(req, res, next) {
  next(createError(404, '그런 test 없어요'))
});

module.exports = router;
