// Allow require
import { createRequire } from "module";

import express from 'express';

//End require
const require = createRequire(import.meta.url);

const fs = require('fs')
const path = require('path')

var router = express.Router();

router.post('/', (req, res) => { 
    let fileData = req.body.data;

    console.log(`FileData: ${JSON.stringify(fileData, null, 2)}`);

    res.send("Success");
    res.end();
});

export default router;