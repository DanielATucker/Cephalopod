def main(log, graph, journal_title, date_format, hour_min, username):

    class send:
    	def __init__(self, message):
    		self.room = room
    		self.server_name = "Server"
    		self.server_socket = list(room.client_list.keys())[0]
    		Chatrooms.message_broadcast(self.room, self.server_name, self.server_socket, message)
    
    username = sender_name
    
    BUFFER_SIZE = 2048
    
    
    send("return "+"Task name?")
    taskname_in = sender_socket.recv(BUFFER_SIZE).decode()
    task_datetime = (f"Task {date_format} {hour_min}")

    taskname = taskname_in

    completed = False

    graph.run(f"MATCH (u: User), (T: TaskMaster) WHERE u.name = '{username}' AND T.name = 'TaskMaster' AND (T)-[*]->(u) CREATE (t: Task), (t)-[r: Task]->(T) SET t.name = '{taskname}', t.task_datetime = '{task_datetime}', t.completed = '{completed}', t.layer = '1'", task_datetime=task_datetime, taskname=taskname, completed=completed, username=username)

    id_number = graph.run(f"MATCH (t: Task), (u: User), (T: TaskMaster) WHERE u.name = '{username}' AND T.name = 'TaskMaster' AND (t)-[*]->(T)-[*]->(u) AND t.name = '{taskname}' RETURN ID (t)", taskname=taskname).evaluate()

    name2 = f"{taskname} (id: {id_number})"

    graph.run(f"MATCH (t: Task), (u: User), (T: TaskMaster) WHERE u.name = '{username}' AND T.name = 'TaskMaster' AND (t)-[*]->(T)-[*]->(u) AND t.name = '{taskname}' SET t.name = '{name2}'", taskname=taskname, username=username, name2=name2)

    send(name2)
    send("Task created")
