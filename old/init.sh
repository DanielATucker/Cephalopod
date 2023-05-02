# Docker install
sudo apt-get install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

sudo mkdir -p ~/etc/apt/keyrings

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update

sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin

sudo systemctl start docker

#Docker install neo4j
sudo docker run --name Cephalopod \
    --publish=7475:7475 --publish=7688:7688 \
    --volume=$HOME/neo4j/data:/data \
    neo4j


#Init ssl
sudo apt-get install libssl-dev

sudo sh ./ssl/Nerves_ssh.sh

sudo sh ./feeler_back/ssl/feeler_back_ssh.sh

sudo sh ./feeler_back/ssl/feeler_front_ssh.sh