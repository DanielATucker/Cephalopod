import os
import sys
import inspect

# modules


from .Brain_handlers.journal_handler import journal_handler


def main(log, graph, journal_title, date_format, sio, user_id, username, User_list):

    Journal_handler = journal_handler(journal_title, date_format, sio, user_id, username, User_list)


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

        Journal_handler.Etitle(sio, user_id, journal_title, journal_body, mood, anxiety, depression, energy)


    elif is_journal_created_today is None:

        graph.run(f"MATCH (u: User), (J: JournalMaster), (J)-[s: link]->(u) WHERE u.name = '{username}' CREATE (j: Journal)-[r: Journal_of]->(J) SET j.name = '{journal_title}', j.is_journal_created_today = 1", journal_title=journal_title, username=username)

        Journal_handler.title(username, User_list, journal_title)

        Journal_handler.body(username, User_list, journal_body)


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
