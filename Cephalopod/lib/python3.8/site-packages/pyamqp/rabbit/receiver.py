from pyamqp.rabbit.core.base_connector import BaseClient, pika

import json
import traceback
import os
import signal
import platform
import threading
import loguru
from queue import Queue
from typing import Union, Callable, List, Dict, Any

# ----- Type Hints definitions ------
PikaChannel = pika.channel.Channel,
PikaMethod = pika.spec.Basic.Deliver,
PikaProperties = pika.spec.BasicProperties

RoutingKeys = Union[str, List[str]]
MessageDict = Dict[str, Any]
MessageCallback = Callable[[MessageDict, Dict], None]


class Receiver(BaseClient):
    """
    Rabbit MQ Receiver class that makes easy the connection
    between a client and Rabbit server to receive messages
    easily.

    Usage example:
    from pyamqp.rabbit.receiver import Receiver

    receiver_instance = Receiver(host='18.222.222.222',
                                 port=5672,
                                 user='guest',
                                 password='1245554221')
    receiver_instance.connect_queue(queue_name='test',
                                    exchange='test_exchange',
                                    routing_keys=['A', 'B'],
                                    is_durable=True,
                                    auto_delete=False)

    def get_message(message, details):
        print(message)

    receiver_instance.consume(callback_function=get_message,
                              no_ack=True,
                              consumer_tag='AAAAKKK_2232')
    """
    def __init__(self,
                 host: str,
                 port: int = 5672,
                 username: str = 'guest',
                 password: str = 'guest',
                 socket_timeout: int = 2,
                 prefetch_count: int = 0,
                 threaded: bool = True,
                 logger=None,
                 heartbeat: int = 300):
        super().__init__(host, port, username, password, socket_timeout, heartbeat)
        # Internal
        self._threads = []
        self._last_queue_name = 'default'
        self._consumer_args = None
        self._queues_args = None
        self.consumer_tag = None
        self.error_queue = Queue()

        if logger is None:
            self.logger = loguru.logger
        self.logger.info("Running on: {}".format(platform.system()))
        self.threaded = threaded
        self.callback_function = self.on_message
        # by default 0 means no specific size in the number of message
        self.channel_connection.basic_qos(prefetch_count=prefetch_count)

    def _create_queue(self, name: str, is_durable: bool, auto_delete: bool):
        self.channel_connection.queue_declare(
            queue=name, durable=is_durable, auto_delete=auto_delete)

    @staticmethod
    def _process_args(locals_value: Dict[str, Any]):
        """receives the locals value and removes the self in it."""
        locals_value.pop('self', None)
        return tuple(locals_value.values())

    def _bind_queues(self, name: str,
                     routing_keys: RoutingKeys,
                     exchange: str):
        """bind queue to an exchange with one or more routing_keys"""
        if not isinstance(routing_keys, list):
            routing_keys = [routing_keys]

        for key in routing_keys:
            self.channel_connection.queue_bind(
                queue=name, routing_key=key, exchange=exchange)

    def _start_consuming(self):
        try:
            self.channel_connection.start_consuming()
        except (pika.exceptions.ConnectionClosed,
                pika.exceptions.ChannelClosed):
            self.logger.error(traceback.format_exc())

            # This is due the nature of threads don´t
            # allow to kill main thread easily
            if platform.system() == "Windows":
                os._exit(-1)
            else:
                os.kill(os.getpid(), signal.SIGINT)

    def _on_message(self, channel: PikaChannel,
                    method: PikaMethod,
                    properties: PikaProperties,
                    body: bytes):
        decoded_message = json.loads(body.decode())
        message_details = {
            'channel': channel,
            'method': method,
            'properties': properties
        }
        self.callback_function(decoded_message, details=message_details)

    def consumer_reconnect(self):
        """Performs reconnection using the parameters received
        in the first place."""
        super().reconnect()

        self.connect_queue(*self._queues_args)
        self.consume(*self._consumer_args)

    def start_consuming(self, threaded: bool):
        """Runs the start_consuming function from the channel connection
        the _start_consuming function handles exceptions trying to reconnect
        the client"""
        if threaded:
            th = threading.Thread(target=self._start_consuming)
            th.start()
        else:
            self._start_consuming()

    def connect_queue(self,
                      queue_name: str,
                      exchange: str,
                      routing_keys: RoutingKeys = '',
                      is_durable: bool = True,
                      auto_delete: bool = False):
        """Creates and binds specified queue to an exchange
        using a empty string '' or a list[str, ..., str]
        in routing_keys argument

        Exceptions
        ---------
        Raises pika.exceptions.ChannelClosed:
            if an exchange or queue were previously
            declared with different parameters.
        """
        self._queues_args = self._process_args(locals())
        self._last_queue_name = queue_name
        self._create_queue(queue_name, is_durable, auto_delete)
        self._bind_queues(queue_name, routing_keys, exchange)

    def consume(self,
                callback_function: MessageCallback = None,
                no_ack: bool = True,
                consumer_tag: str = None):
        """Starts the consumer in order to receive messages into the
        callback_function parameter if passed or in method on_message

        Receiving 2 arguments message and details is mandatory
        in the callback_function
        """
        self._consumer_args = self._process_args(locals())
        if callback_function is not None:
            self.callback_function = callback_function

        self.consumer_tag = self.channel_connection.basic_consume(
            self._on_message, queue=self._last_queue_name,
            no_ack=no_ack, consumer_tag=consumer_tag
        )

        self.start_consuming(self.threaded)

    def on_message(self, message, details):
        """This method is available for inheritance of this class.

        Raises: NotImplementedError if it isn't overwritten
        """
        raise NotImplementedError

