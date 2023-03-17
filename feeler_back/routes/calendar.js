// Allow require
import { createRequire } from "module";
const require = createRequire(import.meta.url);

import Database from "../components/Database.js";

var strftime = require('strftime') 

var express = require('express');
var router = express.Router();
  
/* GET home page. */
router.post('/add_event/:eventTitle', function(req, res) {    
    try{  
      let eventTitle = req.body.eventTitle;
    
      console.log(`Title: ${eventTitle}`);
  
      let data = req.body.eventData;
  
      console.log(`Data: ${JSON.stringify(data, null, 2)}`);
  
      let username = req.session.username;
  
      let now = strftime('%y%m%d_%X');

      let dateStartIn = data.dateStart;

      let dateArray = dateStartIn.split("T");

      let dateStart = dateArray[0];

      let dateStartArray = dateStart.split("-");

      let year = dateStartArray[0];

      let month = dateStartArray[1];

      let day = dateStartArray[2];

      Database(`MATCH (CM: CalendarMaster)-[la]->(U: User {name: '${username}'})\
      MERGE (Y: Year {name: '${year}'})-[lb: YearOf]->(CM)\
      ON CREATE SET Y.name = '${year}',\
      Y.body = '${year}'\
      `);

      Database(`MATCH (Y: Year {name: '${year}'})-[lb: YearOf]->(CM: CalendarMaster)-[la]->(U: User {name: '${username}'})\
      MERGE (M: Month {name: '${month}'})-[lc: MonthOf]->(Y)\
      ON CREATE SET M.name = '${month}',\
      M.body = '${year}-${month}'\
      `);

      Database(`MATCH (M: Month {name: '${month}'})-[lc: MonthOf]->(Y: Year {name: '${year}'})-[lb: YearOf]->(CM: CalendarMaster)-[la]->(U: User {name: '${username}'})\
      MERGE (D: Day {name: '${day}'})-[ld: DayOf]->(M)\
      ON CREATE SET D.name = '${day}',\
      D.body = '${year}-${month}-${day}'\
      `);

      
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