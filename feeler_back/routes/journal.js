// Allow require
import { createRequire } from "module";
const require = createRequire(import.meta.url);

import Database from "../components/Database.js";

var express = require('express');

var router = express.Router();

router.post('/', function(req, res) {    
    let data = req.body.journalData;
    let username = req.session.username;

    Database(`MATCH (JM: JournalMaster)-[la: link]->(U: User {name: '${username}'}) MERGE (J: Journal)-[Jo: JournalOf]->(JM) ON CREATE J.body = '${data}' ON MATCH SET J.body = '${data}'`);

    res.send();
});

export default router;
