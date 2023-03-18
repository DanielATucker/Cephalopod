// Allow require
import { createRequire } from "module";
const require = createRequire(import.meta.url);

import Database from "../components/Database.js";

var strftime = require('strftime') 

var express = require('express');
var router = express.Router();

import { v4 as uuidv4 } from 'uuid';

  
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

      let timeArrayZ = dateArray[1];
      let timeArrayC = timeArrayZ.split(".")[0];
      let timeArray = timeArrayC.split(":");
      let hour = timeArray[0];
      let min = timeArray[1];

      // Add Date to calendar

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

      // Add event to calendar

      let allDayOut = data.allDay;
      let dateStartOut = data.dateStart;
      let dateEndOut = data.dateEnd;
      let labelOut = data.label;
      let descriptionOut = data.label;
      let conferenceOut = data.conference; 

      Database(`MATCH (D: Day {name: '${day}'})-[ld: DayOf]->(M: Month {name: '${month}'})-[lc: MonthOf]->(Y: Year {name: '${year}'})-[lb: YearOf]->(CM: CalendarMaster)-[la]->(U: User {name: '${username}'})\
      MERGE (E: Event {name: '${eventTitle}'})-[le: EventOf]->(D)\
      ON CREATE SET E.name = '${eventTitle}',\
      E.allDay = '${allDayOut}',\
      E.dateStart = '${dateStartOut}',\
      E.dateEnd = '${dateEndOut}',\
      E.label = '${labelOut}',\
      E.description = '${descriptionOut}',\
      E.conference = '${conferenceOut}',\
      E.date = '${year}-${month}-${day}',\
      E.time = '${hour}-${min}',\
      E.class = 'event',\
      E.uuid = '${uuidv4()}',\

      E.dateTimeAdded = '${now}'\
      `);

      res.json("Insert working");
    }
    catch (err) {
      console.log(`ERROR: ${err}`);
    };
  });

router.get('/get_events', (req, res) => {
  let nodePromise = Database(`MATCH (E: Event)-[*]->(CM: CalendarMaster)-[lb]->(U: User {name: '${req.session.username}'}) RETURN (E)`);

  nodePromise.then((result) => {
    if ((typeof result !== 'undefined') && ( result != null)) {
      if (result == "No Database found") {
        res.json({
          "doesExist" : "No Database found. Recommended, Start database"
        });
      }
      else {
        console.log(`Calendar: ${result}`);

        res.json(JSON.stringify(result));       
      };
    }
    else {
      console.log("No node found");
        res.json(`No node found`)
    };
  });
});

router.post('/del_event', function(req, res) {    
  try {
    let data = req.body.eventData;

    let username = req.session.username;

    let dateStartIn = data.dateStart;
    let dateArray = dateStartIn.split("T");
    let dateStart = dateArray[0];
    let dateStartArray = dateStart.split("-");
    let year = dateStartArray[0];
    let month = dateStartArray[1];
    let day = dateStartArray[2];

    let uuid = data.uuid;

    Database(`MATCH (E: Event WHERE E.uuid = '${uuid}')-[le: EventOf]->(D: Day {name: '${day}'}) \
    DELETE le \
    `);
  }
  catch (err) {
    console.log(`Error: ${err}`)
  }

  res.json({"Status":"Del working"});

  
});

export default router;