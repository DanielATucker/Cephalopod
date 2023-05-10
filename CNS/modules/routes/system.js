// Allow require
import { createRequire } from "module";
const require = createRequire(import.meta.url);

var PouchDB = require("pouchdb");

var express = require('express');
var router = express.Router();

import * as dotenv from 'dotenv';

dotenv.config();
  
router.post('/register_admin', (req, res) => {
  try {
    let username = req.body.username;
    let password = req.body.password;
    
    let data = {
      "username": username,
      "password": password
    };
  
    console.log(`Data: ${JSON.stringify(data, null, 2)}`)
      
    var main_db = new PouchDB(`https://${process.env.REACT_APP_host}:${process.env.REACT_APP_port}/database/manifest`);
    
    main_db.info().then(function (info) {
      console.log(`Info: ${JSON.stringify(info)}`);

      main_db.get("Main").then(function (result) {
        console.log(`Main: ${JSON.stringify(result, null, 2)}`);
      
        if (!(JSON.stringify(result).includes(username))) {
          console.log(`Adding data: ${JSON.stringify(data, null, 2)}`);

          result.users[username] = data;

          main_db.put(result).then(function (result2) {
            console.log(`Result2: ${JSON.stringify(result2, null, 2)}`);

            req.session.username = username;
            
            req.session.save()
            res.send("Success");
            res.end();
          }).catch(function (err) {
            console.log(`Error: ${err}`);
          });
    
        } else {
          console.log(`Found data: ${JSON.stringify(username, null, 2)} in database, not adding`);

          res.json("Username Taken");
          res.end();
        }
      }).catch(function (err) {
        console.log(`Error: ${err}`);
      });
    });
  } catch (err) {
    console.log(`Error: ${err}`);
  };
});

router.get('/is_loggedin', (req, res) => {
  console.log(`Username: ${req.session.username}`);

  console.log(`Session: ${JSON.stringify(req.session, null, 2)}`);
  console.log(`Session cookie: ${JSON.stringify(req.session.cookie, null, 2)}`);
  console.log(`Session username: ${JSON.stringify(req.session.username, null, 2)}`);

  if (req.session.username !== undefined) {
    res.json({
      "username": req.session.username
    })
  } else {
    res.json({
      "username": "Not logged in"
    })
  };

  res.end();
});

router.post('/login_admin', (req, res) => {
setTimeout(Login_Admin(req, res), 3000);
});

function Login_Admin(req, res) {
  try {
    console.log(`Session in: ${JSON.stringify(req.session)}`);

    console.log(`USERNAME in: ${JSON.stringify(req.session.username)}`);

    let username = req.body.username;

    let password = req.body.password;
    
    var main_db = new PouchDB(`https://${process.env.REACT_APP_host}:${process.env.REACT_APP_port}/database/manifest`);
      
      main_db.info().then(function (info) {
        main_db.get("Main").then(function (result) {
          console.log(`Main: ${JSON.stringify(result, null, 2)}`);
        
          if (!(JSON.stringify(result).includes(username))) {
            console.log(`Username ${username} not found`);      
          } else {
            console.log(`Username found: ${JSON.stringify({"username": username}, null, 2)}`);
            
            if (!req.session.username) {
              req.session.username = {"username": req.body.username};
              console.log(`Username Set: ${req.session.username}`);
            }

            console.log(`USERNAME out: ${JSON.stringify(req.session.username)}`);

          }
        }).catch(function (err) {
          console.log(`Error: ${err}`);
        });
      });
  } catch (err) {
    console.log(`Error: ${err}`)
  }
};


export default router;