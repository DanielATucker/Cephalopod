// Allow require
import { createRequire } from "module";
const require = createRequire(import.meta.url);

import * as dotenv from 'dotenv';
dotenv.config();

var PouchDB = require("pouchdb");

export function Database_init_start() {
    var account_db = new PouchDB(`http://${process.env.host}:${process.env.host_port}/database/manifest`)

    account_db.info().then(function () {
        account_db.get("Manifest").then(function (result) {
            console.log(`Returned Manifest: ${JSON.stringify(result, null, 2)}`);
        }).then(function () {
            account_db.get("Main").then(function (main) {
                console.log(`Returned Main: ${JSON.stringify(main, null, 2)}`);
            });
        }).catch(function (err) {
            if (err) {
                if (err.error === "not_found"){
                    account_db.put({
                        "_id": "Manifest",
                        "data": {}
                    }).then(function (result) {
                        console.log(`Created Manifest: ${JSON.stringify(result, null, 2)}`);
                    }).catch(function(err) {
                        console.log(`Error: ${JSON.stringify(err, null, 2)}`);
                    }).then(function() {
                        account_db.put({
                            "_id": "Main",
                            "users": {},
                            "system": {},
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