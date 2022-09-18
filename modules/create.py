from .Private_Message import Private_Message


def main(log, graph, journal_title, date_format, sio, user_id, username, User_list):
         
    @sio.event
    def body(username, User_list, journal_body):
            
        Private_Message(f"{journal_body}", username, sio, username)
            
        print("sent")


    @sio.event
    def title(username, User_list, journal_title):
        
        print(f"username {username}")
            
        Private_Message(f"Let's create a new Jounal entry. Journal title: {journal_title}. Journal body?", username, sio, User_list)


    @sio.event
    def Etitle(username, User_list, journal_title, journal_body, mood, anxiety, depression, energy):
            
        sio.emit (f"You have already created a journal today, here it is\n Journal title: {journal_title}\n Body: {journal_body}\n Mood: {mood}\n Anxiety: {anxiety}\n Depression: {depression}\n Energy: {energy}\n", user_id)


    is_journal_created_today = graph.run(f"MATCH (j: Journal), (u: User), (J: JournalMaster), (j: Journal), (j)-[*]->(J)-[r: link]->(u) WHERE j.name = '{journal_title}' AND u.name = '{username}' RETURN j.is_journal_created_today ", journal_title=journal_title, username=username).evaluate()

    if is_journal_created_today == 1:

        today  =  graph.run(f"\
                        MATCH (u: User),\
                        (j: Journal),\
                        (J: JournalMaster)\
                        WHERE j.name = '{journal_title}'\
                        AND u.name = '{username}'\
                        AND (j)-[*]->(J)-[*]->(u)\
                        RETURN j\
                        ", journal_title=journal_title).evaluate()

        journal_body = today["body"]
        journal_name = today["name"]

        mood = today["mood"]
        anxiety = today["anxiety"]
        depression = today["depression"]
        energy = today["energy"]

        Etitle(username, user_id, journal_title, journal_body, mood, anxiety, depression, energy)


    elif is_journal_created_today is None:

        graph.run(f"MATCH (u: User), (J: JournalMaster), (J)-[s: link]->(u) WHERE u.name = '{username}' CREATE (j: Journal)-[r: Journal_of]->(J) SET j.name = '{journal_title}', j.is_journal_created_today = 1", journal_title=journal_title, username=username)

        title(username, journal_title)

        body(username, journal_body)


        graph.run(f"MATCH (u: User), (J: JournalMaster), (j: Journal), (j)-[*]->(J)-[r: link]->(u) WHERE u.name = '{username}' AND j.name = '{journal_title}' SET j.name = '{journal_title}', j.body = '{journal_body}' ", journal_title=journal_title, journal_body=journal_body)

        # Get user input for dicts

        send("Lets add an update to your day")
        send("On a scale of 1 - 10 how is your;\n")
        
        send("return "+"Mood?")
        mood = (sender_socket.recv(BUFFER_SIZE).decode())
        
        send("return "+"Anxiety?")
        anxiety = (sender_socket.recv(BUFFER_SIZE).decode())
        
        send("return "+"Depression?")
        depression = (sender_socket.recv(BUFFER_SIZE).decode())
        
        send("return " + "Energy")
        energy = (sender_socket.recv(BUFFER_SIZE).decode())
        
        send(f"\n Journal Title: {journal_title}\n Body: {journal_body}\n Mood: {mood}\n Anxiety: {anxiety}\n Depression: {depression}\n Energy: {energy}")
	
       
        # Send changes to database

        graph.run(f"\
        MATCH (j: Journal),\
        (J: JournalMaster),\
        (u: User),\
        (j)-[*]->(J)-[r: link]->(u)\
        WHERE j.name = '{journal_title}'\
        AND u.name = '{username}'\
        SET j.mood = '{mood}',\
        j.anxiety = '{anxiety}',\
        j.depression = '{depression}',\
        j.energy = '{energy}'\
        ", mood=mood, journal_title=journal_title, anxiety=anxiety, depression=depression, energy=energy, username=username)
