import getpass
import os

from py2neo import Graph

# Import rich

from rich.console import Console
from rich.theme import Theme
from rich.traceback import install
from rich.logging import RichHandler
import logging


def connect(log):

    uri = "bolt://localhost:7687"
    user = "neo4j"
    password = os.getenv('BrainDBPassword')
    try:
        graph = Graph(uri, auth=(user, password))
    except Exception as e:
    	log.info(e)
    	log.info("No Database Found\n")
    	log.info("Start Database and press press any key to continue\n")
    	input()
    	
    return graph

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


class user():

    def __init__(self, log, graph):

        self.privileges = "user"

        log.info("Username?")
        self.user = input(">>")

        username = self.user

        log.info("Password?")
        pass1 = getpass.getpass(">>")

        log.info("Reenter password to verify")
        pass2 = getpass.getpass(">>")

        while pass1 != pass2:
            log.info("Passwords did not match, Try again")

            log.info("Password?")
            pass1 = getpass.getpass(">>")
            log.info("Reenter password to verify")
            pass2 = getpass.getpass(">>")
        else:
            log.info("Passwords matched")

        self.password = pass2

        graph.run(f"MATCH (m: Main)\
                  CREATE (u: User),\
                  (T: TaskMaster),\
                  (J: JournalMaster),\
                  (TC: TaskCompleted),\
                  (MM: MessageMaster),\
                  (V: Vault),\
                  (u)-[r: link]->(m),\
                  (J)-[s: link]->(u),\
                  (T)-[t: link]->(u),\
                  (TC)-[l: link]->(T),\
                  (MM)-[mm: link]->(u),\
                  (V)-[v_Link: link]->(u)\
                  SET u.name = '{username}',\
                  T.name = 'TaskMaster',\
                  J.name = 'JournalMaster',\
                  TC.name = 'TaskCompleted',\
                  MM.name = 'MessageMaster',\
                  V.name = 'Vault'\
                  ", username=username)

        user = self.user
        password = self.password
        privileges = self.privileges

        graph.run(f"MATCH (u: User)\
                  WHERE u.name = '{user}'\
                  SET u.user = '{user}',\
                  u.password = '{password}',\
                  u.privileges = '{privileges}'\
                  ", user=user, password=password, privileges=privileges)

        log.info("User created")
        
if __name__ == "__main__":
	rich_init()
	graph = connect(log)
	user(log, graph)
