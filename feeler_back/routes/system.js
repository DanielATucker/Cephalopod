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
        "doesExist": "No system found. Recommended, Init System",
        "recommendInit": true
      });
    }
  });
});

router.get('/systeminit', (req, res) => {
  let nodePromise = Database("CREATE (n: Main) SET n.name = 'Main'");

  nodePromise.next((node) => {
    console.log(`node Status: ${node.status}`)
    
    res.json({
      "status": "success"
    });
  
  })
  
export default router;