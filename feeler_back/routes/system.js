// Allow require
import { createRequire } from "module";
const require = createRequire(import.meta.url);

var express = require('express');
var router = express.Router();

import Database from "../components/Database.js";


router.get('/doesExist', (req, res) => {
  let nodePromise = Database("MATCH (n: Main) WHERE n.name='Main' RETURN (n) ");

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

router.get('/systeminit', (req, res) => {
  Database("CREATE (n: Main) SET n.name = 'Main'");

  res.json(JSON.stringify({
    "status": "success",
  }));
});

router.post('/newUser', (req, res) => {
  console.log("TEST");
  
  let session = req.session;
  console.log(`Session: ${session}`);

  let body = req.body;
  console.log(`Body: ${body}`);

  let username=body.username;

  let password = body.password;

  Database("MATCH (m: Main) CREATE (u: User), (T: TaskMaster), (J: JournalMaster), (TC: TaskCompleted), (u)-[r: link]->(m), (J)-[s: link]->(u), (T)-[t: link]->(u), (TC)-[l: link]->(T) SET u.name = '{username}', T.name = 'TaskMaster', J.name = 'JournalMaster', TC.name = 'TaskCompleted' ", username=username);

  Database("MATCH (u: User) WHERE u.name = '{user}' SET u.user = '{user}', u.password = '{password}', u.privileges = 'user' ", user=username, password=password);

  res.json({message: 'message here'});
});

export default router;