// Allow require
import { createRequire } from "module";

//End require
const require = createRequire(import.meta.url);

var PouchDB = require('pouchdb');


export function InputToDatabase(fileData, filename) {  
    console.log(`InputToDatabase start`);

    var manifest_db = new PouchDB(`https://${process.env.REACT_APP_host}:${process.env.REACT_APP_port}/sync/manifest`);

    manifest_db.putAttachment(`${filename}_Doc`, filename, fileData, 'text/plain').then(function () {
        return manifest_db.get(`${filename}_Doc`, { attachments: true });
    }).then(function (doc) {
        console.log(`Doc submitted: ${JSON.stringify(doc, null, 2)}`);
    }).catch(function (err) {
        console.log(`Error: ${JSON.stringify(err, null, 2)}`);
    });
};