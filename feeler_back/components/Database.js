// Allow require
import { createRequire } from "module";
const require = createRequire(import.meta.url);

require('dotenv').config()

var neo4j = require('neo4j-driver')


export default async function Database(query) {
  const Neo4jUser = process.env.Neo4jUser;
  const Neo4jPass = process.env.Neo4jPass;

  console.log(process.env);
  console.log(Neo4jUser);
  console.log(Neo4jPass);

  const uri = "bolt://100.69.19.3:7688";

  let session = null;

  try {
    const driver = neo4j.driver(uri, neo4j.auth.basic(Neo4jUser, Neo4jPass));
    session = driver.session();
  }
  catch (err) {
    console.log(err);
  }

  let result = null;

  let node = null;

  try {
    result = await session.run(query);

    console.log(result);

    const singleRecord = result.records[0];
    
    console.log(singleRecord);
    
    node = singleRecord.get(0);

    console.log(`Node!! ${node}`);
  } finally {
    await session.close()
  }

  try {
      return node
  }
  catch (err) {
      console.log(err);
  }
  
  await driver.close()
};