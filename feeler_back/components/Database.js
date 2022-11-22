// Allow require
import { createRequire } from "module";
const require = createRequire(import.meta.url);

var neo4j = require('neo4j-driver')


export default async function Database(query) {
  const Neo4jUser = process.env.Neo4jUser;
  const Neo4jPass = process.env.Neo4jPass;

  const uri = "100.69.19.3/7688";

  try {
    const driver = neo4j.driver(uri, neo4j.auth.basic(Neo4jUser, Neo4jPass));
    const session = driver.session();
  }
  catch (err) {
    console.log(err);
  }
  /*
  const result = null;

  const node = null;

  try {
    result = await session.run(query);

    console.log(result);

    const singleRecord = result.records[0];
    
    console.log(singleRecord);
    
    node = singleRecord.get(0);

    console.log(node);
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
  */
};