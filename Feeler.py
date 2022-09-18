import socketio

import time
import threading
import logging
import jsonpickle
import getpass

# Modules

from modules.Private_Message import Private_Message
from modules.Feeler_handlers import handler
from modules.console1 import console


User_list = {}

sio =  socketio.Client({
    "headers": {
        'Cookie': "a",
        'Content-Type': 'application/json'
    }
})


def prompt():

    response = ""

    while response != "/exit":

        time.sleep(1)

        response = input(">> ")

        response = response.split(" ")

        command = response[0]

        recipient = response[1]

        message = response[2:][0]


        if command == "/send":

            Private_Message(message, recipient, sio, User_list)

            console.log(f"Sent: {message} To: {recipient}")

class decorator:

    def __init__(self):

        self.sio = sio


def username_to_id(username):

    for user in User_list.values():

        if username == user:

            return user["user_id"]


@sio.event
def connect():

    time.sleep(.5)

    console.log("Enter your username to continue")

    global username

    username = input(">> ")
    sio.emit("username", username)


@sio.event
def auth_successful():

    time.sleep(.5)
    console.log("Orders?")
    prompt()


@sio.event
def req_password():

    console.log("Enter Password")
    password = getpass.getpass(">> ")

    sio.emit("user_password", password)

    console.log("pass")


@sio.event
def message(msg):
    console.log("New Message: " + msg)


@sio.event
def connect_error(data):

    console.log("The connection failed!")
    console.log(data)
    console.log("Bye!")
    exit


@sio.event
def disconnect():

    console.log("Disconnected!")


@sio.event
def users(Users):

    for user in Users.values():

        if user not in User_list.values():

            User_list[user["username"]] = user

@sio.event
def private_message(Message):

    if isinstance(Message, str):
        console.log(Message)
    elif isinstance(Message, dict):
        console.log(Message["message"])
    else:
        console.log(Message.message)


    if "handler" in Message:

        handler.main(Message)


def main():

    console.log("Starting Cephlopod client connection")

    sio.connect('http://localhost:3000')

    sio.wait()


if __name__ == "__main__":

    main()
