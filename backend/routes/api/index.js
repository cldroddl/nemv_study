const express = require('express');
const router = express.Router();
const createError = require('http-errors')

// '*' 을 제일 아래에 두고 나머지 요청에 대해서만 처리할 필요는 없다.
// 아래처럼 제일 위에 두고 미들웨어로 활용할 수도 있다.
// 미들웨어로 활용시에는 순서상 제일 위에 있어야 한다. 순차적으로 실행되므로
router.all('*', (req, res, next) => {
  console.log('path: ' + req.path)
  console.log('param: ' + JSON.stringify(req.params))
  // 미들웨어 처리
  // ...
  // 미들웨어 처리후 다른 처리를 해 줘야 하므로 next() 호출
  next()
})

router.use('/test', require('./test'))
router.use('/companies', require('./companies'))
router.use('/groups', require('./groups'))
router.use('/board', require('./board'))
router.use('/comment', require('./comment'))
/*
 * res.send 는 응답을 json이나 문자열로 보내는 것인고
 * res.render 는 pug 페이지를 그리는 것이다.
 */
/* GET users listing. */
router.get('/hello', function(req, res, next) {
  res.send({message: 'hello', a: 1});
});

router.get('/', function(req, res, next) {
  res.send('api response');
});

// get 뿐만이 아니라 모든 요청 verb 에 대해서 처리
router.all('*', function(req, res, next) {
  next(createError(404, '그런 api 없어요'))
});

module.exports = router;
