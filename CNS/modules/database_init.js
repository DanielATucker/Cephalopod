// Allow require
import { createRequire } from "module";

import * as dotenv from 'dotenv';

const require = createRequire(import.meta.url);

dotenv.config();


var PouchDB = require("pouchdb");

export function Database_init_start() {
    var account_db = new PouchDB(`https://${process.env.REACT_APP_host}:${process.env.REACT_APP_port}/database/manifest`);
    account_db.info().then(function (info) {
        console.log(`Info: ${JSON.stringify(info)}`);
    });
    account_db.info().catch (function (err) {
        console.log(`Error: ${err}`);
    });
    
    /*
    .then(function () {
        account_db.get("Manifest").then(function (result) {
            console.log(`Returned Manifest: ${JSON.stringify(result, null, 2)}`);
        }).then(function () {
            account_db.get("Main").then(function (main) {
                console.log(`Returned Main: ${JSON.stringify(main, null, 2)}`);

                console.log(`\n Database Online!\n\n`);
            
            });
        }).catch(function (err) {
            if (err) {
                if (err.error === "not_found"){
                    account_db.put({
                        "_id": "Manifest",
                        "data": {}
                    }).then(function (result) {
                        console.log(`Created Manifest: ${JSON.stringify(result, null, 2)}`);
                    }).then(function() {
                        //Put Main file
                        account_db.put({
                            "_id": "Main",
                            "users": {},
                            "system": {},
                            "calendar": {}
                        }).then(function (result) {
                            console.log(`Created Main: ${JSON.stringify(result, null, 2)}`);
                        }).catch(function(err) {
                            console.log(`Error: ${JSON.stringify(err, null, 2)}`);
                        });

                        // Put Calendar file
                        account_db.put({
                            "_id": "Calendar",
                            "events": {}
                        }).then(function (result) {
                            console.log(`Created Calendar: ${JSON.stringify(result, null, 2)}`);
                        }).catch(function(err) {
                            console.log(`Error: ${JSON.stringify(err, null, 2)}`);
                        });

                    }).catch(function(err) {
                        console.log(`Error!: ${JSON.stringify(err, null, 2)}`);
                    });
                } else {
                    console.log(`Error!: ${JSON.stringify(err, null, 2)}`);
                };
            };
        });
    }).catch(function(err) {
        console.log(`Error:! ${JSON.stringify(err, null, 2)}`);
    });

    */
};