import socketio
import asyncio

import time
import logging
from datetime import datetime
import jsonpickle
import json

# Modules

from modules import graph_init
from modules import create
from modules import save_message
from modules import Auth
from modules import Private_Message

# Import rich

from rich.console import Console
from rich.theme import Theme
from rich.traceback import install
from rich.logging import RichHandler


User_list = {}

global sio

sio =  socketio.Client({
    "headers": {
        'Cookie': "a",
        'Content-Type': 'application/json'
    }
})


def datetime_init():

    # Use YYYY-MM-DD format
    today = datetime.now()
    date_format = today.strftime("%Y_%m_%d")
    hour_min = today.strftime("%H:%S")
    journal_title = f"Journal_{date_format}"

    return hour_min, journal_title, date_format


def rich_init():

    install(show_locals=True)

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


@sio.event
def connect():

    global log

    sio.emit("username", "Brain")


@sio.event
def connect_error(data):

    console.log("The connection failed!")
    console.log(data)
    console.log("Bye!")
    exit

@sio.event
def disconnect():
    log.info("Disconnected!")

    sio.disconnect()


@sio.event
def user_auth(username, password):

    Auth.Auth(sio, username, password, User_list)


@sio.event
def users(Users):

    for user in Users.values():

        if user not in User_list.values():

            User_list[user["username"]] = user


def username_to_id(username):

    for user in User_list.values():

        if username == user:

            return user["user_id"]



@sio.event
def private_message(Message):

    if isinstance(Message, str):
        log.info(Message)
    elif isinstance(Message, dict):

        user_id_in = Message["sender_id"]

        username = Message["username"]

        user_id = username_to_id(username)

        message = Message["message"]

        log.info(f"{user_id}: {message}")
    else:
        log.info(Message)


    # Save Message

    # save_message.main(Message, username)

    console.log(f" Message: {Message}")

    if Message["message"].startswith("/create"):

        log.info("create started")

        switchboard(sio, Message["message"], user_id, username)


def main():

    sio.connect('http://localhost:3000')

    sio.wait()


def switchboard(sio, data, sender_id, username):

    global log

    global graph

    global hour_min, journal_title, date_format


    if data.startswith("/create"):

        create.main(log, graph, journal_title, date_format, sio, sender_id, username, User_list)


@sio.event
def req_password():

    sio.emit("Brain_password", "BrainPassword")

    sio.emit("message", str("Brain is online @ " + sio.sid))

    log.info("Sent intro msg to Cephalopod users")


@sio.event
def message(message):

    if isinstance(message, str):
        log.info(message)
    elif isinstance(message, dict):
        log.info(message["message"])
    else:
        log.info(message)


if __name__ == '__main__':

    log = rich_init()

    global graph

    graph = graph_init.main(log)

    global hour_min, journal_title, date_format

    hour_min, journal_title, date_format = datetime_init()

    log.info("Starting Cephlopod connection")

    main()
