// Allow require
import { createRequire } from "module";
const require = createRequire(import.meta.url);

require('dotenv').config()

var neo4j = require('neo4j-driver')


export default async function Database(query) {
  const Neo4jUser = process.env.Neo4jUser;
  const Neo4jPass = process.env.Neo4jPass;

  console.log(`USER ${Neo4jUser}`);
  const uri = "bolt://100.108.10.15:7688";

  try {
    const driver = neo4j.driver(uri, neo4j.auth.basic(Neo4jUser, Neo4jPass));
    let session = driver.session();

    let result = await session.run(query);
    
    let records = Object.values(result)[0];
  
    if (Object.keys(records).length === 1) {
      let record = Object.values(records)[0];
        
      let fields = record._fields;

      let fields2 = fields[0];
      
      let properties = fields2.properties;

      return properties;
    };

    if (Object.keys(records).length >= 2) {
      let finalList = [];

      let count = Object.keys(records).length;

      let get_properties = async (records, countTimes) => {
        let record = Object.values(records)[countTimes];
        
        let fields = record._fields;
  
        let fields2 = fields[0];
        
        let properties = fields2.properties;
    
        return properties;
      };

      let countTimes = 0;

      const async_concat = async(oldList, value) => {
        return oldList.concat(value);
      };

      while (countTimes < count) {
        let node = await get_properties(records, countTimes);
        finalList = await async_concat(finalList, node);
        countTimes++       
      };

      console.log(finalList);

      //console.log(`DATA: ${JSON.stringify(records, null, 2)}`);
      
      return finalList
    };
  } 
  catch (err) {

    if (err.name == "Neo4jError") {
      let node = "No Database found"
      return node;
    }
    else {
      console.log(err);
    }
  };
};
