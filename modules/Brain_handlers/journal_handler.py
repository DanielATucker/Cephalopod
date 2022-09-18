from ..Private_Message import Private_Message

from ....Cephalopod.Cephalopod_Brain import sio

class journal_handler(sio):

    def __init__(self, sio):

        self.title = self.title()
        self.body = self.body()
        self.Etitle = self.Etitle()


    @sio.event
    def body(username, User_list, journal_body):

        Private_Message(f"{journal_body}", username, sio, User_list)
        print("sent")


    @sio.event
    def title(username, User_list, journal_title):
        
        print(f"username {username}")

        Private_Message(f"Let's create a new Jounal entry. Journal title: {journal_title}. Journal body?", username, sio, User_list)

    @sio.event
    def Etitle(username, User_list, journal_title, journal_body, mood, anxiety, depression, energy):

        sio.emit (f"You have already created a journal today, here it is\n Journal title: {journal_title}\n Body: {journal_body}\n Mood: {mood}\n Anxiety: {anxiety}\n Depression: {depression}\n Energy: {energy}\n", user_id)
