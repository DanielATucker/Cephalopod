// Allow require
import { createRequire } from "module";
const require = createRequire(import.meta.url);

import Database from "../components/Database";

var express = require('express');

var router = express.Router();

router.post('/', function(req, res) {    
    let data = req.body.journalData;

    console.log(data);

    Database(`MATCH (JM: JournalMaster)-[la: link]->(U: User {name: '${req.session.username}'}) MERGE (J: Journal {body: '${data}'})-[Jo: JournalOf]->(JM) ON MATCH  SET J.body = '${data}'`);

    res.send();
});

export default router;
