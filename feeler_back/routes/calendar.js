// Allow require
import { createRequire } from "module";
const require = createRequire(import.meta.url);

import Database from "../components/Database.js";


var express = require('express');
var router = express.Router();
  
/* GET home page. */
router.get('/add_event', (req, res) => {
  res.send('working')
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