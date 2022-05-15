import json



def to_int(x, y):
	for i in x:
		if i == "," or i == " ":
			pass
		else:
			new_i = int(i)
			y.append(new_i)

def main(log, graph, journal_title, username):

    BUFFER_SIZE = 2048


    today = graph.run(f"MATCH (j: Journal), (u: User), (J: JournalMaster) where j.name = '{journal_title}' AND u.name = '{username}' AND J.name = 'JournalMaster' RETURN (j) ", journal_title=journal_title).evaluate()

    journal_body = today["body"]
    
    send(f"\n Here is your journal entry for today\n Journal title: {journal_title}\n Body {journal_body}\n")
    

    mood_in =  graph.run(f"MATCH (j: Journal), (u: User), (J: JournalMaster) WHERE u.name = '{username}' AND J.name = 'JournalMaster' RETURN j.mood", journal_title=journal_title)
    anxiety_in = graph.run(f"MATCH (j: Journal), (u: User), (J: JournalMaster) WHERE u.name = '{username}' AND J.name = 'JournalMaster' RETURN (j.anxiety)", journal_title=journal_title)
    depression_in = graph.run(f"MATCH (j: Journal), (u: User), (J: JournalMaster) WHERE u.name = '{username}' AND J.name = 'JournalMaster' RETURN (j.depression)", journal_title=journal_title)
    energy_in = graph.run(f"MATCH (j: Journal), (u: User), (J: JournalMaster) WHERE u.name = '{username}' AND J.name = 'JournalMaster' RETURN (j.energy)", journal_title=journal_title)

    mood_list = []
    while mood_in.forward():
        mood_out = (mood_in.current[0])
        to_int(mood_out, mood_list)
        
    anxiety_list = []
    while anxiety_in.forward():
        anxiety_out = (anxiety_in.current[0])
        to_int(anxiety_out, anxiety_list)
                
    depression_list = []
    while depression_in.forward():
        depression_out = (depression_in.current[0])
        to_int(depression_out, depression_list)
        
    energy_list = []
    while energy_in.forward():
    	energy_out = (energy_in.current[0])
    	to_int(energy_out, energy_list)
    	

    tracking_list = {}
    dict_cover = {}
    
    
    tracking_list["mood_list"] = mood_list
    tracking_list["anxiety_list"] = anxiety_list
    tracking_list["depression_list"] = depression_list
    tracking_list["energy_list"] = energy_list
    
    dict_cover["tracking_list"] = tracking_list
    
    dict_cover = json.dumps(dict_cover)
    
    print(dict_cover)
    return dict_cover
