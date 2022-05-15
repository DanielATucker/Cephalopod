from celery import Celery

import socketio
import asyncio

import time


app = Celery('tasks',
    broker_url = 'amqp://myuser:mypassword@localhost:5672/myvhost',

    result_backend = 'redis://localhost:6379/0'
)


@app.task
def start_server():
    pass


@app.task
def Server_client():
    pass


sio = socketio.AsyncClient()


@sio.event
async def connect():

    print("Connected to Cephalopod")

    await sio.emit("message", "Brain is online @ " + sio.sid)
    print("Sent intro msg to Cephalopod")


@sio.event
async def message(msg):
    print("New Message: " + msg)


@sio.event
def connect_error(data):
    try:
        print("The connection failed!")
        print(data)
    except KeyboardInterrupt:
        print("Bye!")

@sio.event
async def disconnect():
    print("Disconnected!")

    await sio.disconnect()


@sio.event
async def users(data):

    users = []
    
    x = 0
    
    for user in data:
        username = data[x]["username"]
        
        x = x + 1
        
        if username not in users:
            users.append(username)

    print(f"Users in the room:")
    print(', '.join(users))


@sio.event
async def session(data):
    pass


@sio.on("private message")
async def on_private_message(data):
	
	#sender = data["from"]
	#message = data["content"] 
	
	print(f"Message: {data}")


async def init():

   await sio.connect('http://localhost:3000', auth= {
       'username': "Brain"
   })
   await sio.wait()


if __name__ == '__main__':


    print("Starting Cephlopod client connection") 

    time.sleep(1)

    try:
       asyncio.run(init())
    except KeyboardInterrupt:
        print("Bye!")

