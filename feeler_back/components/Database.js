// Allow require
import { createRequire } from "module";
const require = createRequire(import.meta.url);

require('dotenv').config()

var neo4j = require('neo4j-driver')


export default async function Database(query) {
  const Neo4jUser = process.env.Neo4jUser;
  const Neo4jPass = process.env.Neo4jPass;

  const uri = "bolt://100.69.19.3:7688";

  let nodeList = [];

  try {
    const driver = neo4j.driver(uri, neo4j.auth.basic(Neo4jUser, Neo4jPass));
    let session = driver.session();

    let result = await session.run(query);
    
    let records = Object.values(result)[0];
    
    let nodeList = []

    function nodeListCall(properties) {
      console.log(JSON.stringify(properties));

      nodeList.concat(properties);

      console.log(nodeList);

      console.log(JSON.stringify(nodeList));
    };

    records.forEach(async record  => {
      record = Object.values(records)[0];
    
      console.log(`Typeof: ${record}`);
    
      let fields = record._fields;

      let fields2 = fields[0];
      
      let properties = fields2.properties;
      
      nodeListCall(properties);

      console.log(`NodeList: ${nodeList}`);

      await session.close();

      await driver.close();
    });
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