#!/bin/sh
echo "\n"
echo "                    *************************************************"
echo "                    *          Installation docker-compose          *"
echo "                    *************************************************"
sudo curl https://download.docker.com/linux/raspbian/gpg
sudo chmod o+w /etc/apt/sources.list
echo "deb https://download.docker.com/linux/raspbian/ stretch stable" >> /etc/apt/sources.list
sudo chmod o-w /etc/apt/sources.list

sudo apt-get install docker-compose -y
