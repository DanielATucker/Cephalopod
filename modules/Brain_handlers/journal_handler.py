from ..Private_Message import Private_Message


def journal_handler(sio, journal_title, date_format, user_id, username, User_list):
    
    @sio.event
    def body(usernane, User_list, journal_body):

        Private_Message(f"{journal_body}", username, sio, User_list)
        print("sent")


    @sio.event
    def title(usernane, User_list, journal_title):
        
        print(f"user id {user_id}")

        Private_Message(f"Let's create a new Jounal entry. Journal title: {journal_title}. Journal body?", username, sio, User_list)

    @sio.event
    def Etitle(username, User_list, journal_title, journal_body, mood, anxiety, depression, energy):

        sio.emit (f"You have already created a journal today, here it is\n Journal title: {journal_title}\n Body: {journal_body}\n Mood: {mood}\n Anxiety: {anxiety}\n Depression: {depression}\n Energy: {energy}\n", user_id)
