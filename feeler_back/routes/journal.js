// Allow require
import { createRequire } from "module";
const require = createRequire(import.meta.url);


var express = require('express');

var router = express.Router();

router.post('/', function(req, res, next) {    
    data = req.body.journalData
    Database(`MATCH (U: User {name: ${req.session.username}}), (JM: JournalMaster) WHERE (JM)-[la: link]->(U) CREATE (J: Journal {body: ${data}}), (J)-[lb: Journal]-(JM)`);

    res.send();
    
    next();
});

export default router;
