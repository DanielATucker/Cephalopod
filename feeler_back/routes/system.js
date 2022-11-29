// Allow require
import { createRequire } from "module";
const require = createRequire(import.meta.url);

var express = require('express');
var router = express.Router();

var strftime = require('strftime') 

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
  Database("CREATE (n: Main) SET n.name = 'Main'");

  res.json(JSON.stringify({
    "status": "success",
  }));
});

router.post('/newUser', function (req, res) {    
  let username = req.body.username;

  let password = req.body.password;

  let id = req.session.id;


  let now = strftime("%y%m%d_%X");

  Database(`MATCH (m: Main) CREATE (u: User), (T: TaskMaster), (J: JournalMaster), (TC: TaskCompleted), (u)-[r: link]->(m), (J)-[s: link]->(u), (T)-[t: link]->(u), (TC)-[l: link]->(T) SET u.name = '${username}', u.password = '${password}', u.privileges = 'user', u.loginHistory = '${JSON.stringify([{"createdTime": now}])}', u.createdTime = '${now}', u.id = '${id}', T.name = 'TaskMaster', J.name = 'JournalMaster', TC.name = 'TaskCompleted'`);
  res.end();
});

router.post('/login', function (req, res) {    
  let username = req.body.username;

  let password = req.body.password;

  let nodePromise = Database(`MATCH (n: User) WHERE n.name = '${username}' AND n.password = '${password}' RETURN (n)`);

  nodePromise.then((node) => {    
   if (node.loginHistory != "undefined") {
    let nowRaw = strftime("%y%m%d_%X");
    
    let now = {};

    now[nowRaw] = "Logged in";

    let loginHistory = node.properties.loginHistory;

    loginHistory = loginHistory.concat(JSON.stringify(now)); 

    Database(`MATCH (n: User) WHERE n.name = '${username}' AND n.password = '${password}' SET n.loginHistory = '${loginHistory}'`);
   }
   else {
    res.sendStatus(200)
  }
  });
});

router.get('/getUsername', (req, res) => {
  let userId = req.session.id;
  
  let nodePromise = Database(`MATCH (u: User) WHERE u.id = '${userId}' RETURN (u)`);

  nodePromise.then((node) => {
    if ((typeof node !== 'undefined') && ( node !== null) && (node !== "No Database found")) {
      console.log(`NODE ${JSON.stringify(node)}`);
      console.log(`USERNAME ${node.properties.name}`);
      
      res.json({
        "username": node.properties.name
      })
    }
    else {
      res.json({"username": "Not logged in"});
    } 
  });
});

export default router;
