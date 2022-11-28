// Allow require
import { createRequire } from "module";
const require = createRequire(import.meta.url);

var createError = require('http-errors');
var express = require('express');
var path = require('path');

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
const session = require('express-session');
var logger = require('morgan');
var cors = require('cors')


//Routes 

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import getUsernameRouter from "./routes/get_username.js";
import systemRouter from "./routes/system.js"

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

//BodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//init sessions
const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
    secret: "abcd",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false,
    genid: function(req) {
      return genuuid() // use UUIDs for session IDs
    },
}));

app.use(cookieParser());

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

// Use Router
app.use("/", indexRouter);
app.use('/users', usersRouter);
app.use("/get_username", getUsernameRouter);
app.use("/system", systemRouter);

export default app;
