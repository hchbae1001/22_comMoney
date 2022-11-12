var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let bcrypt = require('bcrypt');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var methodOverride = require('method-override');
var app = express();

const { sequelize } = require('./models');
sequelize.sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html',require('ejs').renderFile);
//patch나 delete일때 사용
app.use(methodOverride('_method'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/jQuery', express.static((__dirname + '/node_modules/jquery/dist/'))); //jQuery
app.use('/bootStrap', express.static(__dirname + '/node_modules/bootstrap/dist/')); // bootstrap JS
app.use('/js',express.static(__dirname + '/public/javascripts/'));
app.use('/css',express.static(__dirname + '/public/stylesheets/'));


app.use('/', indexRouter);
app.use('/user', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
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
