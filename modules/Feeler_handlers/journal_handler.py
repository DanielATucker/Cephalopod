from ..console1 import console


def main(Message):

    if Message["part"] == "journal_title":

        journal_title(Message)


def journal_title(Message):

    console.log(Message["Message"])


