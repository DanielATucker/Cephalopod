// Allow require
import { createRequire } from "module";
const require = createRequire(import.meta.url);

var strftime = require('strftime')

import Database from "../components/Database.js";

var express = require('express');

var router = express.Router();

router.post('/', function(req, res) {    
    let data = req.body.journalData;
    let username = req.session.username;

    let now = strftime('%y%m%d_%X');
    
    Database(`MATCH (JM: JournalMaster)-[la: link]->(U: User {name: '${username}'}) MERGE (J: Journal)-[Jo: JournalOf]->(JM) ON CREATE SET J.body = '${data}', set J.createdOn = '${now}' ON MATCH SET J.body = '${data}', J.lastEdit = '${now}'`);

    res.send();
});

export default router;
