// Allow require
import session from "express-session";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

var express = require('express');
var router = express.Router();

var strftime = require('strftime') 

const { v4: uuidv4 } = require('uuid');

import Database from "../components/Database.js";


router.get('/doesExist', (req, res) => {
  let nodePromise = Database("MATCH (n: Main) WHERE n.name='Main' RETURN (n)");

  nodePromise.then((node) => {
    if ((typeof node !== 'undefined') && ( node != null)) {
      if (node == "No Database found") {
        res.json({
          "doesExist" : "No Database found. Recommended, Start database"
        })
      }
      else {
        res.json({
          "doesExist": "System found."
        });
      }
    }
    else {
      res.json({
        "doesExist": "No system found. Recommended, Init System"
      });
    }
  });
});

router.get('/doesUserExist', (req, res) => {
  let nodePromise = Database("MATCH (m: Main), (u: User) WHERE (m)<-[*]-(u) RETURN (u)");

  nodePromise.then((node) => {
    if ((typeof node !== 'undefined') && ( node != null)) {
      if (node == "No Database found") {
        res.json({
          "doesExist" : "No Database found. Recommended, Start database"
        })
      }
      else {
        res.json({
          "doesExist": "User found"
        });
      }
    }
    else {
      res.json({
        "doesExist": "No user found"
      });
    }
  });
});

router.get('/systeminit', (req, res) => {
  Database("CREATE (m: Main), (s: System), (S: SessionMaster), (S)-[a: link]->(s)-[b: link]->(m) SET m.name = 'Main', s.name = 'System', S.name = 'SessionMaster'");

  res.json(JSON.stringify({
    "status": "success",
  }));
});

router.post('/newUser', function (req, res) {  
  let username = req.body.username;

  let password = req.body.password;

  let now = strftime("%y%m%d_%X");

  Database(`MATCH (m: Main) CREATE (u: User), (T: TaskMaster), (J: JournalMaster), (TC: TaskCompleted), (u)-[r: link]->(m), (J)-[s: link]->(u), (T)-[t: link]->(u), (TC)-[l: link]->(T) SET u.name = '${username}', u.password = '${password}', u.privileges = 'user', u.loginHistory = '${JSON.stringify([{"createdTime": now}])}', u.createdTime = '${now}', T.name = 'TaskMaster', J.name = 'JournalMaster', TC.name = 'TaskCompleted'`);
  res.end();
});

router.post('/login', function (req, res) {  
  console.log(`USERNAME in: ${JSON.stringify(req.session.username)}`);

  if (!req.session.username) {
    req.session.username = req.body.username;
    req.session.save();
  }
  else {
    console.log(`User found ${req.session.username}`)
  };

  console.log(`USERNAME out: ${JSON.stringify(req.session.username)}`);

  let username = req.body.username;

  let password = req.body.password;

  let nodePromise = Database(`MATCH (n: User) WHERE n.name = '${username}' AND n.password = '${password}' RETURN (n)`);

  nodePromise.then(node => {    
    if ((typeof node !== 'undefined') && ( node != null) && (node !== "No Database found")) {
      let nowRaw = strftime("%y%m%d_%X");
    
      let now = {};

      now[nowRaw] = "Logged in";

      
      let loginHistory = node.properties.loginHistory;

      loginHistory = loginHistory.concat(JSON.stringify(now)); 

      Database(`MATCH (n: User) WHERE n.name = '${username}' AND n.password = '${password}' SET n.loginHistory = '${loginHistory}'`);
    }
  });
});

router.get('/getUsername', (req, res) => {
  console.log(`Cookie1: ${JSON.stringify(req.cookie)}`);
  res.json({"username": req.session.cookie.username});
});

export default router;