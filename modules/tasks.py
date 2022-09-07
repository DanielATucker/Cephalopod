import rich
from rich.tree import Tree
from rich import print

import json
import jsonpickle


def main(log, graph, username):

    BUFFER_SIZE = 2048
    
    send("Here are your tasks:\n")

    tasks_in = graph.run("\
                         MATCH (t: Task)\
                         RETURN t\
                         ").data()

    task_tree = Tree("Tasks")

    task_branch_names = {}
    task_branch_names["TaskMaster_Branch"] = task_tree


    for task in tasks_in:

        task = task["t"]
        taskname = task["name"]


        parent = graph.run(f"\
                           MATCH (t: Task)-[r]->(p),\
                           (u: User)\
                           WHERE t.name = '{taskname}'\
                           AND (t)-[*]->(u)\
                           RETURN p\
                           ", taskname=taskname).data()
        parent = parent[0]["p"]["name"]

        task_branch_name = taskname + "_Branch"

        parent_branch_name = parent + "_Branch"


        if parent_branch_name not in task_branch_names:
            task_branch_names[parent_branch_name] = parent_branch_name

            grandparent = graph.run(f"MATCH (t)-[r]->(p)-[r2]->(g) WHERE t.name = '{taskname}' RETURN g", taskname=taskname).data()
            grandparent = grandparent[0]["g"]["name"]
            grandparent_branch_name = grandparent + "_Branch"

            task_branch_names[parent_branch_name] = task_branch_names[grandparent_branch_name].add(parent)

        if task_branch_name not in task_branch_names:
            task_branch_names[task_branch_name] = task_branch_names[parent_branch_name].add(taskname)

   	
   
    task_tree = jsonpickle.encode(task_tree)
    send(task_tree)
