var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// frontend의 static 리소스를 사용할 경우 
// frontend에서 outputDir을 backend의 public로 지정해 줘도 되고
// 아래처럼 backend 에서 static 폴더를 frontend의 dist 폴더로 지정해 줘도 된다.
// app.use(express.static(path.join(__dirname, 'frontend', 'dist')))
// 여기서는 제목 설정등 여러가지 설정이 frontend에서 하는 것이 편할 것 같아
// frontend에서 backend의 public 폴더로 복사해 주는 방식을 택한다.

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
