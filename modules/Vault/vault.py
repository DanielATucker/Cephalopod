from dirsync import sync

# Vault modules

# from . import new_connection
# from . import delete
# from . import edit


def main():

    main_prompt()

    vault_switchboard(data)


def vault_switchboard(data):

    if data == "/new":
        new_connection.main()
    elif data == "/delete":
        delete.main()
    elif data == "/edit":
        edit.main*()


def main_prompt():

    send( "/new - New Vault connection", "/edit - Edit Vault connection", "/delete - Delete Vault Connection" )
