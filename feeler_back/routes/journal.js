// Allow require
import { createRequire } from "module";
const require = createRequire(import.meta.url);


var express = require('express');

var router = express.Router();

router.post('/', function(req, res, next) {    
    data = req.body.journalData
    Database(`MATCH (JM: JournalMaster)-[la: link]->(U: User {name: '${req.session.username}'}) MERGE (J: Journal {body: '${data}'})-[Jo: JournalOf]->(JM) ON MATCH  SET J.body = '${data}'`);

    res.send();
    
    next();
});

export default router;
