import pika

# ----- Type Hints definitions ------
ChannelConnection = pika.adapters.blocking_connection.BlockingChannel


class BaseClient(object):
    """
    Abstract class that handles the connection
    between a client and Rabbit server
    """
    def __init__(self,
                 host: str,
                 port: int = 5672,
                 username: str = 'guest',
                 password: str = 'guest',
                 socket_timeout: int = 2,
                 heartbeat: int = 300):
        # Connection parameters and channel creation
        self._credentials = pika.PlainCredentials(username, password)
        self._params = pika.ConnectionParameters(
            host, port, '/', self._credentials,
            socket_timeout=socket_timeout,
            heartbeat=heartbeat
        )
        self.channel_connection = self._connect()

    def __repr__(self):
        return "{}".format(self._params)

    def _connect(self) -> ChannelConnection:
        self._connection = pika.BlockingConnection(self._params)
        return self._connection.channel()

    def reconnect(self):
        self.close()
        self.channel_connection = self._connect()

    def close(self):
        """Invoke a graceful shutdown of the channel with the AMQP Broker.
        if the channel is open, else the channel is probably close or closing"""
        if self.channel_connection.is_open:
            self.channel_connection.close()
