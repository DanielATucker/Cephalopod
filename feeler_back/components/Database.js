// Allow require
import { createRequire } from "module";
const require = createRequire(import.meta.url);

require('dotenv').config()

var neo4j = require('neo4j-driver')

let finalList = [];

export default async function Database(query) {
  const Neo4jUser = process.env.Neo4jUser;
  const Neo4jPass = process.env.Neo4jPass;

  const uri = "bolt://100.69.19.3:7688";

  try {
    const driver = neo4j.driver(uri, neo4j.auth.basic(Neo4jUser, Neo4jPass));
    let session = driver.session();

    let result = await session.run(query);
    
    let records = Object.values(result)[0];
  
    console.log(Object.keys(records).length);

    if (Object.keys(records).length === 1) {
      let record = Object.values(records)[0];
        
      let fields = record._fields;

      let fields2 = fields[0];
      
      let properties = fields2.properties;

      console.log(properties);

      return properties;
    };

    if (Object.keys(records).length >= 2) {
      let count = Object.keys(records).length;

      console.log(2);

      console.log(count);

      let get_properties = async (records, countTimes) => {
        let record = Object.values(records)[countTimes];
        
        let fields = record._fields;
  
        let fields2 = fields[0];
        
        let properties = fields2.properties;
  
        console.log(properties);
  
        return properties;
      };

      let countTimes = 0;

      while (countTimes < count) {
        let node = get_properties(records, countTimes);

        finalList.concat(node.then());

        countTimes++
      };

      console.log(finalList);
      
      return finalList
    };
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