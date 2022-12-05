// Allow require
import { createRequire } from "module";
const require = createRequire(import.meta.url);

var strftime = require('strftime')

import Database from "../components/Database.js";

var express = require('express');

var router = express.Router();

router.post('/post_journal', function(req, res) {    
    let data = req.body.journalData;
    
    let username = req.session.username;

    let now = strftime('%y%m%d_%X');

    let journalTitle = (`Journal ${strftime('%y%m%d')}`);

    Database(`MATCH (JM: JournalMaster)-[la: link]->(U: User {name: '${username}'}) MERGE (J: Journal {name: '${journalTitle}'})-[Jo: JournalOf]->(JM) ON CREATE SET J.name = '${journalTitle}', J.body = '${data}', J.createdOn = '${now}' ON MATCH SET J.body = '${data}', J.lastEdit = '${now}'`);

    res.send();
});

router.get('/get_journal', function(req, res) {
    let nodePromise = Database(`MATCH (J: Journal)-[la]->(JM: JournalMaster)-[lb]->(U: User {name: '${req.session.username}'}) RETURN (J)`);

    nodePromise.then((result) => {
        if ((typeof result !== 'undefined') && ( result != null)) {
          if (result == "No Database found") {
            res.json({
              "doesExist" : "No Database found. Recommended, Start database"
            });
          }
          else {
            console.log(result);
            
            res.json(JSON.stringify(result));
          };
        }
        else {
            console.log("No node found");

            res.json(`No node found`)
        };
    });
});

export default router;
