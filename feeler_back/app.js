// Allow require
import { createRequire } from "module";
const require = createRequire(import.meta.url);


import path from 'path';
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = __dirname(__filename);



var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

//Routes 
import indexRouter from './routes/index.js';
import UsersRouter from "./routes/users.js";
import Get_UsernameRouter from "./routes/get_username.js";


var app = express();
app.use(cors())

app.set('port', process.env.PORT || 3001)

app.listen(app.get('port'), () => {
  console.log(`Express server listening on port ${app.get('port')}`);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Use Router
app.use('/', indexRouter);
app.use('/users', UsersRouter);
app.use("/get_username", Get_UsernameRouter);

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