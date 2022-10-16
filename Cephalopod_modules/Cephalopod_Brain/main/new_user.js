const prompt = require("prompt-sync")({ sigint: true });


export default function new_user (graph) {
    self.privileges = "user"

    console.log("Username?")

    username = prompt(">>")

    console.log("Password?")
    pass1 = getpass.getpass(">>")

    console.log("Reenter password to verify")
    pass2 = getpass.getpass(">>")

    while (pass1 != pass2) {
        console.log("Passwords did not match, Try again or exit");

        console.log("Password?");
        pass1 = getpass.getpass(">>");
        console.log("Reenter password to verify");
        pass2 = getpass.getpass(">>");
    }
    
    console.log("Passwords matched");
    
    let password = pass2

    graph.run(`MATCH (m: Main)\n
              CREATE (u: User),\n
              (T: TaskMaster),\n
              (J: JournalMaster),\n
              (TC: TaskCompleted),\n
              (MM: MessageMaster),\n
              (V: Vault),\n
              (u)-[r: link]->(m),\n
              (J)-[s: link]->(u),\n
              (T)-[t: link]->(u),\n
              (TC)-[l: link]->(T),\n
              (MM)-[mm: link]->(u),\n
              (V)-[v_Link: link]->(u)\n
              SET u.name = '${username}',\n
              T.name = 'TaskMaster',\n
              J.name = 'JournalMaster',\n
              TC.name = 'TaskCompleted',\n
              MM.name = 'MessageMaster',\n
              V.name = 'Vault' `, username=username)

    graph.run(`MATCH (u: User)\n
              WHERE u.name = '${username}'\n
              SET u.user = '${username}',\n
              u.password = '${password}',\n
              u.privileges = '${privileges}'\n
              `, user=user, password=password, privileges=privileges)

    console.log("User created")
}