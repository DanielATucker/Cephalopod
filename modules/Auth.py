from .graph import graph_init
from .Private_Message import Private_Message

class Auth:

    def __init__(self, sio, username, password, User_list):

        graph = graph_init(username)

        matched_user = graph.run(f"MATCH (u: User) WHERE u.name = '{username}' RETURN (u)", username=username).evaluate()

        matched_user_pass = graph.run(f"MATCH (u: User) WHERE u.name = '{username}' RETURN u.password", username=username).evaluate()

        matched_user = matched_user["name"]


        if (matched_user != username or matched_user_pass != password):

            Private_Message("Username or password is incorrect, please try again. If this message persists, contact administrator", username, sio, User_list)
        else:

            sio.emit("auth_success", username)
            Private_Message("Auth Successfull", username, sio, User_list)
