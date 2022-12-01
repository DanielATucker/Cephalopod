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
  if (typeof req.session.id0 === "undefined") {
    req.session.id0 = req.session.id
    req.session.save();
    
    console.log(`Added id0: ${req.session.id0}`)
  };
  console.log(`id0: ${req.session.id0}`);

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
  if (typeof req.session.username !== "undefined") {
    req.session.username = req.body.username;
  };
  
  let username = req.body.username;

  let password = req.body.password;

  let now = strftime("%y%m%d_%X");


  let sessionIds = [];

  console.log(`SESSION ID : ${res.sessionID}`);
  sessionIds.concat(req.sessionID);

  Database(`MATCH (m: Main) CREATE (u: User), (T: TaskMaster), (J: JournalMaster), (TC: TaskCompleted), (u)-[r: link]->(m), (J)-[s: link]->(u), (T)-[t: link]->(u), (TC)-[l: link]->(T) SET u.name = '${username}', u.password = '${password}', u.privileges = 'user', u.loginHistory = '${JSON.stringify([{"createdTime": now}])}', u.createdTime = '${now}', u.sessionIds = '${sessionIds}', T.name = 'TaskMaster', J.name = 'JournalMaster', TC.name = 'TaskCompleted'`);
  res.end();
});

router.post('/login', function (req, res) {  
  console.log(`USERNAME in: ${JSON.stringify(req.session.username)}}`);

  if (typeof req.session.username !== "undefined") {
    req.session.username = req.body.username;
    req.session.save();
  };

  console.log(`USERNAME out: ${JSON.stringify(req.session.username)}}`);

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

      let sessionIds = [];
      sessionIds.concat(`IDs: ${JSON.stringify(node.properties.sessionIds)}`);
      sessionIds.concat(`ID: ${JSON.stringify(Id)}}`);
      
      console.log(JSON.stringify(sessionIds));

      Database(`MATCH (n: User) WHERE n.name = '${username}' AND n.password = '${password}' SET n.loginHistory = '${loginHistory}', n.sessionIds = '${sessionIds}'`);
    }
  });
});

router.get('/getUsername', (req, res) => {
  let userId = req.session.id;
  
  let nodePromise = Database(`MATCH (u: User) RETURN u.sessionIds`);

  nodePromise.then(node => {
    if ((typeof node !== 'undefined') && ( node !== null) && (node !== "No Database found")) {
      console.log(`NODE ${JSON.stringify(node)}`);
    }
    else {
      res.json({"username": "Not logged in"});
    } 
  });
});

export default router;
