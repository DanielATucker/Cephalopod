const neo4j = require('neo4j-driver')

import { new_user } from "./new_user.js";

export default class graph_init {
    constructor() {
        uri = "bolt://localhost:7688";
        neo4j_user = "neo4j"
        neo4j_password = process.env.BrainDBPassword;
    
        const driver = neo4j.driver(uri, neo4j.auth.basic(neo4j_user, neo4j_password));
        const graph = driver.session();

        system_init(graph);

        return graph
    }
    
    system_init(graph){
        let main = graph.run(`MATCH (n: Main) WHERE n.name='Main' RETURN (n)`).evaluate();

        if (main == None) {
            console.log("No data found. Initializing system.");
            create_system(graph);
        }  
    }

    create_system(graph) {
        graph.run(`CREATE (m: Main), (b: Brain), (MM: MessageMaster), (b)-[l: link]->(m), (MM)-[n: link]->(b) SET m.name = 'Main', b.name = 'Brain', MM.name = 'MessageMaster' `);
        console.log("You must create a user profile to continue");
        new_user(graph);
    }
};