from ..Private_Message import Private_Message


class journal_handler:

    def __init__(self, sio):

        class Events:

            def __init__(self, sio):

                @sio.event
                def body(self, journal_body):

                    sio.emit("private_message", f"{journal_body}")

        Events = Events(sio)
        self.body = Events.body()


    def title(self, sio, user_id, journal_title, User_list):

        print(f"user id {user_id}")
        Private_Message(f"Let's create a new Jounal entry. Journal title: {journal_title}. Journal body?", user_id, sio, User_list)


    def Etitle(self, sio, user_id, journal_title, journal_body, mood, anxiety, depression, energy):

        sio.emit (f"You have already created a journal today, here it is\n Journal title: {journal_title}\n Body: {journal_body}\n Mood: {mood}\n Anxiety: {anxiety}\n Depression: {depression}\n Energy: {energy}\n", user_id)
