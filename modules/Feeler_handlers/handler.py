from . import journal_handler


def main(Message):

    if Message["handler"] == "journal":

        journal_handler.main(Message)

