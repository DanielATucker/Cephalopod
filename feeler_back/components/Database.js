// Allow require
import { createRequire } from "module";
const require = createRequire(import.meta.url);

require('dotenv').config()

var neo4j = require('neo4j-driver')


export default async function Database(query) {
  const Neo4jUser = process.env.Neo4jUser;
  const Neo4jPass = process.env.Neo4jPass;

  const uri = "bolt://100.69.19.3:7688";

  try {
    const driver = neo4j.driver(uri, neo4j.auth.basic(Neo4jUser, Neo4jPass));
    let session = driver.session();

    let result = await session.run(query);

    let records = Object.values(result)[0];

    let record = Object.values(records)[0];

    try{
      let values = record.values().next()

      let node = Object.values(values)[2];

      let properties = Object.values(node)[2];

      console.log(`First Properties: ${JSON.properties}`);
    }
    catch (err) {
      try{
        let fieldslist = record._fields;

        console.log(JSON.stringify(fields[0]));
      }
      catch (err) {
        console.log(`Request Conformation`);
      };
    }

    await session.close();

    await driver.close();
  } 
  catch (err) {

    if (err.name == "Neo4jError") {
      node = "No Database found"
      return node;
    }
    else {
      console.log(err);
    }
  };
};