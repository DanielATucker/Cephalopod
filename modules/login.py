import getpass

def main(log, graph):

    log.info("You must login to continue")
    log.info("Username?")
    username = input(">>")

    user = graph.run(f"MATCH (u: User) WHERE u.name = '{username}' RETURN (u)", username=username).evaluate()

    if user != None:
        pass
    else:
        while user == None:
            log.info("Username not found, please try again or contact system administrator")

            log.info("Username?")
            username = input(">>")

            user = graph.run(f"MATCH (u: User) WHERE u.name = '{username}' RETURN (u)", username=username).evaluate()

    log.info("Password?")
    password = getpass.getpass(">>")

    returned_pass = graph.run(f"MATCH (u: User) WHERE u.name = '{username}' RETURN u.password", username=username).evaluate()

    if password == returned_pass:
        log.info("Lognin Successful")
    else:
        while password != returned_pass:

            log.info("Password incorrect, please try again or contact system administrator for pasword reset") 

            log.info("Password?")
            password = getpass.getpass(">>")

            returned_pass = graph.run(f"MATCH (u: User) WHERE u.name = '{username}' RETURN u.password", username=username).evaluate()

    return username
