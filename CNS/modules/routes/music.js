// Allow require
import { createRequire } from "module";

import express from 'express';
import  * as evs from 'express-video-stream'; // Express Video Stream


const require = createRequire(import.meta.url);


const fs = require('fs')
const path = require('path')



var router = express.Router();

router.get('/', (req, res) => { 
    try {
        evs.addVideo("failed_state", "./Revolution/Failed_State.mp3");

        var page = fs.readFileSync("./modules/routes/index.html"); // Load html into buffer
        res.send(page + ' ');
    } catch (err) {
        console.log(`Error: ${err}`);
    };
});

export default router;
