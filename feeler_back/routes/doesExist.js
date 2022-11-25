// Allow require
import { createRequire } from "module";
const require = createRequire(import.meta.url);

var express = require('express');
var router = express.Router();

import Database from "../components/Database.js";

router.get('/', (req, res) => {
  let nodePromise = Database("MATCH (n: Main) WHERE n.name='Main' RETURN (n) ");

  nodePromise.then((node) => {
    
    if (typeof node !== 'undefined') {
      res.json({
        "doesExist": "true",
        "node": node
      });
    }
    else {
      res.json({"doesExist": "false"});
    }
  });
});

export default router;

