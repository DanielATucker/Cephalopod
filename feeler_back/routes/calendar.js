// Allow require
import { createRequire } from "module";
const require = createRequire(import.meta.url);

import Database from "../components/Database.js";


var express = require('express');
var router = express.Router();
  
/* GET home page. */
router.post('/add_event/:eventTitle', function(req, res) {    
    try{
      console.log(`ALL DATA: ${JSON.stringify(req.body), null, 2}`);
  
      let eventTitle = req.body.eventTitle;
    
      console.log(`Title: ${eventTitle}`);
  
      let data = req.body.eventData;
  
      console.log(`Data: ${JSON.stringify(data)}`);
  
      let username = req.session.username;
  
      let now = strftime('%y%m%d_%X');
      
      //Database(`MATCH (CM: CalendarMaster)-[la]->(U: User {name: '${username}'}) MERGE (J: Journal {name: '${journalTitle}'})-[Jo: JournalOf]->(JM) ON CREATE SET J.name = '${journalTitle}', J.body = '${data}', J.createdOn = '${now}' ON MATCH SET J.body = '${data}', J.lastEdit = '${now}'`);
  
      res.json("Insert working");
    }
    catch (err) {
      console.log(`ERROR: ${err}`);
    };
  });

router.get('/get_events', (req, res) => {
    let nodePromise = Database(`MATCH (c: *)-[la]->(CM: CalendarMaster)-[lb]->(U: User {name: '${req.session.username}'}) RETURN (c)`);

    nodePromise.then((result) => {
        if ((typeof result !== 'undefined') && ( result != null)) {
          if (result == "No Database found") {
            res.json({
              "doesExist" : "No Database found. Recommended, Start database"
            });
          }
          else {
            console.log(`Calendar: ${result}`);

            //res.json(JSON.stringify(result));
          };
        }
        else {
            console.log("No node found");

            res.json(`No node found`)
        };
    });
    res.json('working')
  });

export default router;