openssl req -x509 -newkey rsa:4096 -keyout feeler_front_key.pem -out feeler_front_cert.pem -sha256 -days 365 -subj '/CN=100.69.19.3:3001' -nodes