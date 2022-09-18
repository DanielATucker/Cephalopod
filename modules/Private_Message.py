import jsonpickle


class Private_Message:

        def __init__(self, message, recipient, sio, User_list):

            self.message = message
            self.recipient = recipient
            self.sender_id = sio.sid
            self.username = self.id_to_username(sio, User_list)

            sio.emit("private_message", jsonpickle.encode(self))


        def id_to_username(self, sio, User_list):

            for user in User_list.items():

                if user["sid"] == sio.sid:

                    return user["username"]


        def __repr__(self):

            yield self.message


        def __setstate__(self, state):

            state.setdefault('NodeText', None)

            for k, v in state.items():
                setattr(self, k, v)

