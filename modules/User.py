class User:
	def __init__(self, user_pass, new_client_address, new_client_socket):
		self.name = user_pass[0]
		self.password = user_pass[1]
		self.socket = new_client_address
		self.client_socket = new_client_socket
