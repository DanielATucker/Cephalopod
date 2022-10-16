import { private_message } from "./private_message";

export function auth(socket, graph, sender_info, username, password){
    let matched_user = graph.run(`MATCH (u: User) WHERE u.name = '${username}' RETURN (u)`, username=username).evaluate();
    
    matched_user = matched_user["name"];
   
    let matched_user_pass = graph.run(`MATCH (u: User) WHERE u.name = '${username}' RETURN u.password`, username=username).evaluate();
   
    if (matched_user != username || matched_user_pass != password) {
        private_message("Username or password is incorrect, please try again. If this message persists, contact administrator", socket, sender_info);
    } else {
        sio.emit("auth_success", username);
        private_message("Auth Successfull", socket, sender_info);
    }
};