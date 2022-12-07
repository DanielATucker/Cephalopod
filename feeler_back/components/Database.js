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
    
    function get_record(record) {
      record = Object.values(records)[0];
        
      let fields = record._fields;

      let fields2 = fields[0];
      
      let properties = fields2.properties;

      return properties;
    };

    let nodeList = records.map(get_record);
    
    console.log(JSON.stringify(nodeList));

    console.log(Object.keys(nodeList).length);

    //return nodeList
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