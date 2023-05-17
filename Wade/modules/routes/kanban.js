// Allow require
import { createRequire } from "module";

import express from 'express';

//End require
const require = createRequire(import.meta.url);

var router = express.Router();
var PouchDB = require("pouchdb");


router.get('/task_add', (req, res) => { 
    var main_db = new PouchDB(`https://${process.env.REACT_APP_host}:${process.env.REACT_APP_port}/database/manifest`);
    
    let event = req.body.data;

    

    main_db.info().then(function (info) {
      console.log(`Info: ${JSON.stringify(info)}`);

      main_db.get("Kanban").then(function (result) {
        console.log(`Kanban: ${JSON.stringify(result, null, 2)}`);


      });
    });
});

export default router;
