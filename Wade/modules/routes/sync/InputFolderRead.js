// Allow require
import { createRequire } from "module";

import { Blob } from 'buffer';
import * as fs from 'fs';

//End require
const require = createRequire(import.meta.url);

/*
var PouchDB = require('pouchdb');

var manifest_db = new PouchDB(`https://${process.env.REACT_APP_host}:${process.env.REACT_APP_port}/sync/manifest`);
*/


export default function InputFolderReadInit(folderPath){
    console.log(`InputFolder Init`);

    let folderData  = fs.readdirSync(folderPath, {
        encoding: "buffer",
        withFileTypes: true,
    });

    console.log(`FolderData: ${JSON.stringify(folderData, null, 2)}`);
};