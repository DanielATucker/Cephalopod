from celery import Celery

import socketio
import asyncio

import time
import logging
from datetime import datetime

# Modules

from modules import graph_init
from modules import create

# Import rich

from rich.console import Console
from rich.theme import Theme
from rich.traceback import install
from rich.logging import RichHandler


app = Celery('tasks',
    broker_url = 'amqp://myuser:mypassword@localhost:5672/myvhost',

    result_backend = 'redis://localhost:6379/1',
    
    
    REDIS_DB=1,
    CELERY_DEFAULT_QUEUE = 'Cephalopod_Brain'
)


class Socket_Users:
	def __init__(self, username, userID):
		self.username = username
		self.userID = userID


@app.task
def datetime_init():
	
	#  Use YYYY-MM-DD format

	today = datetime.now()
	date_format = today.strftime("%Y_%m_%d")
	hour_min = today.strftime("%H:%S")
	journal_title = f"Journal_{date_format}"
	
	return hour_min, journal_title, date_format


@app.task
def rich_init():

    install()

    global console
    console = Console(record=True)
    custom_theme = Theme({"1": "red"})
    console = Console(theme=custom_theme)

    logging.basicConfig(
        level="INFO",
        format="%(message)s",
        datefmt="[%X]",
        handlers=[RichHandler(rich_tracebacks=True)]
    )

    global log
    log = logging.getLogger("rich")
    return log


@app.task
def start_server():
    pass


@app.task
@app.task
def Server_client():
    pass


sio = socketio.Client()


@app.task
@sio.event
def connect():

    print("Connected to Cephalopod")

    sio.emit("message", "Brain is online @ " + sio.sid)
    print("Sent intro msg to Cephalopod")


@app.task
@sio.event
def connect_error(data):
    try:
        print("The connection failed!")
        print(data)
    except KeyboardInterrupt:
        print("Bye!")


@app.task
@sio.event
def disconnect():
    print("Disconnected!")

    sio.disconnect()


@app.task
@sio.event
def users(data):

    users = []
    
    x = 0
    for user in data:
        username = data[x]["username"]
        
        x = x + 1
        
        if username not in users:
            users.append(username)

    print(f"Users in the room:")
    print(', '.join(users))
    
    
    socket_users = {}
    y = 0
    for user in data:
    	socket_user_name = data[y]["username"]
    	
    	username = data[y]["username"]
    	userID = data[y]["userID"]
    	
    	y + 1
    	socket_users[socket_user_name] = Socket_Users(username, userID)


@app.task
@sio.event
def session(data):
    pass


@app.task
@sio.on("private message")
def on_private_message(data):
	
	#message = data["content"] 
	
	print(f"Message: {data}")
	
	sender_id = data.split(" ")
	
	message = data.split(" ")
	
	print(f"message is {message[1]}")
	print(f"sender is {sender_id[0]}")
	
	if str(message[1]).startswith("/create"):
		
		print("create started")
		
		switchboard(sio, message[1], sender_id)


@app.task
def main():

   sio.connect('http://localhost:3000', auth= {
       'username': "Brain"
   })
   sio.wait()


@app.task
def switchboard(sio, data, sender_id):
	
	log = rich_init()
	
	graph = graph_init.main(log)
	
	
	hour_min, journal_title, date_format = datetime_init()
	
	if data.startswith("/create"):
		create.main(log, graph, journal_title, date_format, sio, sender_id)


if __name__ == '__main__':


    print("Starting Cephlopod client connection")
    
    main()
    

