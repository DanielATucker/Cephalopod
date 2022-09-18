import jsonpickle


class Private_Message:

        def __init__(self, message, recipient, sio, username):

            self.message = message
            self.recipient = recipient
            self.sender_id = sio.sid
            self.sender = username
            
            sio.emit("private_message", jsonpickle.encode(self))


        def __repr__(self):

            yield self.message


        def __setstate__(self, state):

            state.setdefault('NodeText', None)

            for k, v in state.items():
                setattr(self, k, v)

