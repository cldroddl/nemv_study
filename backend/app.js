const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const history = require('connect-history-api-fallback')
const cors = require('cors')
const mongoose = require('mongoose')
const cfg = require('./config/config')  // 설정파일

// const apiRouter = require('./routes/api')
if (!cfg) {
  console.error('error: no config file')
  process.exit(1)
}

// DeprecationWarning 전역 설정
// mongoose.set('useFindAndModify', false)
// mongoose.set('useCreateIndex', true)
// mongoose.set('useNewUrlParser', true)
// mongoose.set('useUnifiedTopology', true)
// mongoose.connect(cfg.db.url, (err) => {
// DeprecationWarning 지역 설정
mongoose.connect(cfg.db.url, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (err) return console.error(err)
  console.log('mongoose connected!')
  // const pg = require('./playGround')
  // pg.test.model();
})

const app = express();

// /api 위에서 cors 를 사용하겠다고 선언
// cors 를 사용하면 다른 서버에서 요청해도 데이터를 보내줄 수 있다.
// app.use(require('cors')())
if (cfg.web.cors) app.use(cors())

// view 는 사용하지 않고 api 서버로만 사용할 것이므로 삭제
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// 모두 static 위에 있으면 / 등도 다 받아서 backend 에서 처리해 버리므로 static 에서 처리 전에
// 이렇게 require 를 바로 적어줘도 된다.
app.use('/api', require('./routes/api'))
// app.use('/api', apiRouter)
app.use(history())
app.use(express.static(path.join(__dirname, 'public')));

// frontend의 static 리소스를 사용할 경우
// frontend에서 outputDir을 backend의 public로 지정해 줘도 되고
// 아래처럼 backend 에서 static 폴더를 frontend의 dist 폴더로 지정해 줘도 된다.
// app.use(express.static(path.join(__dirname, 'frontend', 'dist')))
// 여기서는 제목 설정등 여러가지 설정이 frontend에서 하는 것이 편할 것 같아
// frontend에서 backend의 public 폴더로 복사해 주는 방식을 택한다.
// catch 404 and forward to error handler
// app.use('/', indexRouter);
// app.use('/users', usersRouter);

app.use(function(req, res, next) {
// 처리 필요가 있는 것들만 static 위에 넣어준다.
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  /*
   * res.send 는 응답을 json이나 문자열로 보내는 것인고
   * res.render 는 pug 페이지를 그리는 것이다.
   */
  res.send({ status: err.status || 500, message: err.message });
});

module.exports = app
