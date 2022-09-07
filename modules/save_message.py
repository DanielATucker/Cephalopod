from . import graph_init

# Import rich

from rich.console import Console
from rich.theme import Theme
from rich.traceback import install
from rich.logging import RichHandler

import logging


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


def main(Message, username):
	
	message = Message.message[0]
	sender = Message.sender
	sender_id = Message.sender_id
	recipient = Message.recipient
	
	log = rich_init()
	
	graph = graph_init.connect(log)
	
	graph.run(f"\
		MATCH (u: User),\
		(MM: MessageMaster)\
		WHERE u.name = '{username}' AND \
		MM.name = 'MessageMaster'\
		CREATE (m: Message),\
		(m)-[M: Message]->(MM)-[l: link]->(u)\
		SET m.message = '{message}',\
		m.sender = '{sender}',\
		m.sender_id = '{Message.sender_id}',\
		m.recipient = '{recipient}'\
		")
