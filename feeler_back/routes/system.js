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
          "doesExist" : "No Database found, Recommend Init system"
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
        "doesExist": "No system found"
      });
    }
  });
});

router.get('/isDatabaseOnline', (req, res) => {
  fetch('100.69.19.3:7475')
  .then((response) => {
    if (response.status === 200) {
      res.json({
        "isDatabaseOnline": "Database Found"
      });
    } else {
      res.json({
        "isDatabaseOnline": "No Database found"
      })
     }
   })
  .catch((error) => {
    res.json({
      "isDatabaseOnline": error
    });
  });
});

export default router;

