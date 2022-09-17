from ..Private_Message import Private_Message


class journal_handler:

    def __init__(self, sio, username, User_list):

        self.init1(sio)

        self.username = username
        self.User_list = User_list


    def init1(self, sio):

        @sio.event
        def body(self, journal_body):

            username = self.username
            User_list = self.User_list

            Private_message(f"{journal_body}", username, sio, User_list)
            print("sent")


        @sio.event
        def title(self, journal_title):

            username = self.username
            User_list = self.User_list

            print(f"user id {user_id}")

            Private_Message(f"Let's create a new Jounal entry. Journal title: {journal_title}. Journal body?", username, sio, User_list)


    def Etitle(self, sio, username, User_list, journal_title, journal_body, mood, anxiety, depression, energy):

        sio.emit (f"You have already created a journal today, here it is\n Journal title: {journal_title}\n Body: {journal_body}\n Mood: {mood}\n Anxiety: {anxiety}\n Depression: {depression}\n Energy: {energy}\n", user_id)
