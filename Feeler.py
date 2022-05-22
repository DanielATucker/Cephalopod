from celery import Celery
from celery import signature

import socketio

import time
import threading
import logging

# Import rich

from rich.console import Console
from rich.theme import Theme
from rich.traceback import install
from rich.logging import RichHandler


app = Celery('tasks',
    broker_url = 'amqp://myuser:mypassword@localhost:5672/myvhost',

    result_backend = 'redis://localhost:6379/2',
    
    
    REDIS_DB=2,
    CELERY_DEFAULT_QUEUE = 'Feeler'
)




class Socket_Users:
	def __init__(self, username, userID):
		self.username = username
		self.userID = userID
	
	
global sio
sio = socketio.Client()

# Register apps (@app.task)

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
def prompt():
	
	response = ""
	while response != "/exit":
		global sio
		time.sleep(1)
		response = input(">> ")
		sio.emit("message", str(sio.sid) +  " " + response)


@app.task
def intro():

	global log
	
	
	global sio
	sio.emit(f"message", "Hello from Daniel @ " + str(sio.sid))
	log.info("Sent intro msg to Cephalopod")


@app.task
def start_server():
    pass


@app.task
def Server_client():
    pass


@app.task
@sio.event
def connect():

    global log
    
    
    log.info("Connected to Cephalopod")
    
    intro()
    
    prompt()
    
    
@app.task   
@sio.event
def message(msg):
    log.info("New Message: " + msg)


@app.task
@sio.event
def connect_error(data):

    global log
    
    
    try:
        log.info("The connection failed!")
        log.info(data)
    except KeyboardInterrupt:
        log.info("Bye!")
        
        
@app.task
@sio.event
def disconnect():
    log.info("Disconnected!")

    sio.disconnect()


@app.task
@sio.event
def users(data):

    global log
    
    
    users = []
    
    x = 0
    for user in data:
        username = data[x]["username"]
        
        x = x + 1
        
        if username not in users:
            users.append(username)

    log.info(f"Users in the room:")
    log.info(', '.join(users))
    
    
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
	
	global log
	
	
	#sender = data["from"]
	#message = data["content"] 
	
	log.info(f"Message: {data}")
	
	
def main():
	
	global log
	
	log = rich_init()
	
	log.info("Starting Cephlopod client connection")
	
	
	global sio
	sio.connect('http://localhost:3000', auth= {
		'username': "Daniel"
		})
	
	sio.wait()
	
	
if __name__ == "__main__":
	main()
