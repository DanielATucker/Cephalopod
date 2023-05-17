// Allow require
import { createRequire } from "module";

//End require
const require = createRequire(import.meta.url);

import * as dotenv from 'dotenv';
dotenv.config();


export function GetManifest() {
    console.log(`GetManifest start`);

    var PouchDB = require("pouchdb");

    var manifest_db = new PouchDB(`https://${process.env.REACT_APP_host}:${process.env.REACT_APP_port}/sync/manifest`);

    manifest_db.info().then(function () {
        manifest_db.get("Manifest").then(function (result) {
            console.log(`Returned Manifest: ${JSON.stringify(result, null, 2)}`);
        }).then(function () {
            manifest_db.get("Main").then(function (main) {
                console.log(`Returned Main: ${JSON.stringify(main, null, 2)}`);
            });
        }).catch(function (err) {
            if (err) {
                if (err.error === "not_found"){
                    manifest_db.put({
                        "_id": "Manifest",
                        "data": {}
                    }).then(function (result) {
                        console.log(`Created Manifest: ${JSON.stringify(result, null, 2)}`);
                    }).catch(function(err) {
                        console.log(`Error: ${JSON.stringify(err, null, 2)}`);
                    }).then(function() {
                        //Put Main file
                        manifest_db.put({
                            "_id": "Main",
                            "Docs": {}
                        }).then(function (result) {
                            console.log(`Created Main: ${JSON.stringify(result, null, 2)}`);
                        }).catch(function(err) {
                            console.log(`Error: ${JSON.stringify(err, null, 2)}`);
                        });
                    });
                } else {
                    console.log(`Error: ${JSON.stringify(err, null, 2)}`);
                };
            };
        });
    }).catch(function(err) {
        console.log(`Error: ${JSON.stringify(err, null, 2)}`);
    });
};