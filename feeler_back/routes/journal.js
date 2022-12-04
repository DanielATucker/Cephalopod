// Allow require
import { createRequire } from "module";
const require = createRequire(import.meta.url);

import Database from "../components/Database.js";

var express = require('express');

var router = express.Router();

router.post('/', function(req, res) {    
    let data = req.body.journalData;
    let username = req.session.username;

    console.log(req.session)
    console.log(username);
    console.log(data);

    let nodePromise = Database(`MATCH (JM: JournalMaster)-[la: link]->(U: User {name: '${username}'}) MERGE (J: Journal {body: '${data}'})-[Jo: JournalOf]->(JM) ON MATCH SET J.body = '${data}' RETURN (J)`);

    nodePromise.then((node) => {
        if ((typeof node !== 'undefined') && ( node != null)) {
          if (node == "No Database found") {
            res.json({
              "doesExist" : "No Database found. Recommended, Start database"
            })
          }
          else {
            console.log(`Node: ${JSON.stringify(node)}`);
          }
        }
        else {
            console.log("No node found");
        }
    });

    res.send();
});

export default router;
