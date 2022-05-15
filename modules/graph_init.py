import os
from py2neo import Graph
import logging

from modules import new_user
from modules import login

def connect(log):

    uri = "bolt://localhost:7688"
    user = "neo4j"
    password = os.getenv('BrainDBPassword')
    try:
        graph = Graph(uri, auth=(user, password))
    except:
        log.info("No Database Found\n")
        log.info("Start Database and press press any key to continue\n")
        input()

    return graph

def create_system(log, graph):

    graph.run(f"\
              CREATE (n: Main)\
              SET n.name = 'Main'\
              ")

    log.info("You must create a user profile to continue")

    new_user.user(log, graph)


def system_init(log, graph):

    main = graph.run(f"MATCH (n: Main)\
                     WHERE n.name='Main'\
                     RETURN (n)\
                     ").evaluate()

    if main == None:
        log.info("No data found. Initializing system.")
        create_system(log, graph)
    else:
        pass


def main(log):
    graph = connect(log)
    system_init(log, graph)
    return graph
