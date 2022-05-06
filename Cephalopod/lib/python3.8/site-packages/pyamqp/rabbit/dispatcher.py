import json
from typing import Union, List, Dict, Any
import loguru
import traceback
from pika.exceptions import ChannelClosed

from pyamqp.rabbit.core.base_connector import BaseClient

# ----- Type Hints definitions ------
MessageDict = Dict[str, Any]


class Dispatcher(BaseClient):
    """
    Rabbit MQ Dispatcher class that makes easy the connection
    between a client and Rabbit server to deliver messages
    easily
    """
    def __init__(self,
                 host: str,
                 port: int = 5672,
                 username: str = 'guest',
                 password: str = 'guest',
                 socket_timeout: int = 2,
                 logger=None,
                 heartbeat: int = 300):
        super().__init__(host, port, username, password, socket_timeout, heartbeat)
        # Stats
        self._exchanges_used = list()
        self._exchange = None
        if logger is None:
            self.logger = loguru.logger

    def __repr__(self):
        return "{}\nExchanges used: {}".format(
                    self._params, self._exchanges_used)

    def _save_last_exchange(self):
        try:
            self._exchange = self._exchanges_used[-1]
        except IndexError:
            raise ValueError("No exchange specified.")

    def get_last_exchange(self):
        return self._exchange

    def connect_exchanges(self,
                          exchanges: Union[str, List[str]],
                          exchange_type: str = 'fanout',
                          is_passive: bool = False,
                          auto_delete: bool = False,
                          is_durable: bool = True):
        """
        This function aims to simplify the connection
        to a variety of exchanges by  allowing to use a list in
        the parameter "exchanges".

        If you need to use different configurations
        for each exchange you will have to use this function twice or more.

        Exceptions
        ----------
        Raises:
            pika.exceptions.ChannelClosed
                if the exchange is already declared with
                different parameters or configuration
        """
        if isinstance(exchanges, str):
            exchanges = [exchanges]

        for exchange in exchanges:
            self._exchanges_used.append(exchange)
            self.channel_connection.exchange_declare(
                exchange=exchange,
                exchange_type=exchange_type,
                durable=is_durable,
                auto_delete=auto_delete,
                passive=is_passive
            )
        self._save_last_exchange()

    def send_message(self,
                     message: Union[str, Dict[str, Any]],
                     key: str = '',
                     exchange: str = None):
        """
        Sends message to specified routing key/ exchange combination
        if exchange is not passed as an argument then
        the last declared exchange will be used.

        Exceptions
        ----------
        Raises:
            AssertionError.
                if exchanges equals to None in basic_publish call.
            pika.exceptions.ChannelClosed:
                if exchange is not open.
        """
        if exchange is None:
            exchange = self._exchange

        if isinstance(message, dict):
            message = json.dumps(message)

        try:
            self.channel_connection.basic_publish(
                exchange=exchange, routing_key=key, body=message)
        except ChannelClosed as e:
            self.logger.error(traceback.format_exc())
            raise ChannelClosed(f"Failure sending message: {e} on exchange:{exchange}")

