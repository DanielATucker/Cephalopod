// Allow require
import { createRequire } from "module";


import * as dotenv from 'dotenv';

import System from "./routes/system.js";
import Calendar from "./routes/calendar.js";
import Music from "./routes/music.js";

import  * as evs from 'express-video-stream'; 

import { fileURLToPath } from 'url';


const require = createRequire(import.meta.url);


var path = require('path');
var fs = require('fs');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
const session = require('express-session');
var logger = require('morgan');
var cors = require('cors');
var FileStore = require('session-file-store')(session);


// Express Video Stream


var privateKey = fs.readFileSync('./ssl/wade_key.pem');
var certificate = fs.readFileSync('./ssl/wade_cert.pem');

var credentials = {key: privateKey, cert: certificate};

var https = require('https');


dotenv.config();

export function Express_Init_Start() {
    var PouchDB = require("pouchdb");

    var express = require('express');
    var app = express();

    var httpsServer = https.createServer(credentials, app);

    app.use(cookieParser('This is a secret'));

    // set a cookie
    app.use(function (req, res, next) {
        // check if client sent cookie
        var cookie = req.cookies.cookieName;
        if (cookie === undefined) {
        // no: set a new cookie
        var randomNumber=Math.random().toString();
        randomNumber=randomNumber.substring(2,randomNumber.length);
        res.cookie('cookieName',randomNumber, { maxAge: 900000, httpOnly: true });
        console.log('cookie created successfully');
        } else {
        // yes, cookie was already present 
        console.log('cookie exists', cookie);
        } 
        next(); // <-- important!
    });

    app.use(session({ 
        cookie: { maxAge:  24 * 60 * 60 * 1000, httpOnly: true },
        credentials: true,
        saveUninitialized: false,
        resave: true,
        store: new FileStore(),
        secret: `This is a secret`
    }));

    app.use(cors({
        //origin: true,
        origin: true,
        optionsSuccessStatus: 200,
        credentials: true
    }));

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    
    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');

    app.use('/database', require('express-pouchdb')(PouchDB.defaults({
        prefix: './database/'
    })));

    app.disable('etag');

    app.use('/system', System);
    app.use('/calendar', Calendar);
    app.use('/music', Music);

    app.use(evs.middleware); //Use streaming middleware


    app.use(function(err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};
    
        // render the error page
        res.status(err.status || 500);
        res.render('error');
    });

    let port = 3001;

    httpsServer.listen(port, () => {
        console.log(`Express server listening on port ${port}`);
    });
    
    //app.listen(port);
    //console.log(`Server listening on port: ${port}`);
};