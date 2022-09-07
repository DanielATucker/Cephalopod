import os
from py2neo import Graph

from . import Private_Message


def graph_init(username):

    uri = "bolt://localhost:7688"
    user = "neo4j"
    password = os.getenv('BrainDBPassword')
    try:
        graph = Graph(uri, auth=(user, password))
    except Exception as e:
        Private_Message("No Database Found")

        Private_Message(e)

        Private_Message("Start Database, and retry")

    return graph
