import base64
import logging
import sys
from Crypto.Cipher import AES
from Crypto.Hash import SHA256
from Crypto import Random

from rich.logging import RichHandler

class EncryptedLogFormatter(logging.Formatter):

    # make sure that the `key` is a byte stream on Python 3.x
    def __init__(self, key, fmt=None, datefmt=None):

        key = key.encode()

        self._key = SHA256.new(key).digest()  # use SHA-256 for a proper-sized AES key
        super(EncryptedLogFormatter, self).__init__(fmt=fmt, datefmt=datefmt)

    def format(self, record):
        message = record.msg  # log message to encrypt, if any
        if message:  # no sense to encrypt empty log messages
            message = message.encode("utf-8")
            iv = Random.new().read(AES.block_size)  # we'll be using CBC so generate an IV
            cipher = AES.new(self._key, AES.MODE_CBC, iv)
            # AES demands all blocks to be of `AES.block_size` so we have to pad the message
            # you can use any padding you prefer, I think PKCS#7 is the best option
            padding = AES.block_size - len(message) % AES.block_size
            # pad the message...
            message += bytes([padding]) * padding
            message_enc = iv + cipher.encrypt(message)  # add iv and encrypt
            # finally, replace our plain-text message with base64 encoded encrypted one
            record.msg = base64.b64encode(message_enc).decode("latin-1")
        # you can do more here, even print out your own string but we'll just
        # pass it to the default formatter now that the message is encrypted
        # so that it can respect other formatting options.
        return super(EncryptedLogFormatter, self).format(record)

def init():

    # lets get the root logger
    log  = logging.getLogger("rich")
    elog = logging.getLogger("elog")

    # create a new handler, file handler instead of stdout is perfectly fine
    filename = "Brain.log"
    handler = logging.FileHandler(filename, encoding="utf-8")

    # now lets get to business

    handler.setFormatter(EncryptedLogFormatter("1234", "[%(levelname)s] %(message)s"))
    elog.addHandler(handler)

def decrypt_log():
    with open("Brain.log", "r") as f:
        for line in log_decryptor("1234", f):
            print(line)  # or write to a 'decrypted.log' for a more persistent solution


# make sure that the `key` is a byte stream on Python 3.x

def log_decryptor(key, stream):  # assume the stream can be iterated line-by-line

    key = key.encode()

    key = SHA256.new(key).digest()  # same derivation as in the EncryptedLogFormatter
    for line in stream:
        if not line.strip():  # empty line...
            continue  # ignore it!
        level, stream = line.split(None, 1)  # split on log level and log data
        message_enc = base64.b64decode(stream.encode("latin-1"))  # decode the stream
        iv = message_enc[:AES.block_size]  # grab the IV from the beginning
        # decrypt the stream
        message = AES.new(key, AES.MODE_CBC, iv).decrypt(message_enc[AES.block_size:])
        padding = message[-1]  # get the padding value; Python 3.x: message[-1]
        if message[-padding:] != bytes([padding]) * padding:
            raise ValueError("Invalid padding encountered.")
        # Python 3.x: decode the me message[:-padding].decode("utf-8")
        yield "{} {}".format(level, message[:-padding].decode("utf-8"))
