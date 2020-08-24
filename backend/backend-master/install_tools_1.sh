#!/bin/sh
echo "\n"
echo "                    **********************************************************"
echo "                    *                    Ajout des alias                     *"
echo "                    **********************************************************"
echo "alias bye=\"sudo shutdown -h now\"" >>~/.bashrc
echo "alias ll=\"ls -la\"" >>~/.bashrc
echo "alias bc=\"docker-compose run --rm app bin/console \$@\"" >>~/.bashrc
echo "alias composer=\"docker-compose run --rm app composer \$@\"" >>~/.bashrc
echo "Alias de débug ajouté, voir la documentation pour l'utilisation"
echo "\n"

echo "                    *****************************************"
echo "                    *          Installation de git          *"
echo "                    *****************************************"
sudo apt-get update -y && sudo apt-get upgrade -y
sudo apt-get install git -y

echo "\n"
echo "                    ****************************************************"
echo "                    *          Installation pre-requis docker          *"
echo "                    ****************************************************"
sudo apt-get install \
apt-transport-https \
ca-certificates \
curl \
libssl-dev \
python \
python-pip \
gnupg-agent \
gnupg2 \
pass \
software-properties-common -y

echo "\n"
echo "                    *****************************************"
echo "                    *          Installation docker          *"
echo "                    *****************************************"
#curl sh -fsSL https://get.docker.com -o get-project.sh
sh -c "$(curl -fsSL https://get.docker.com -o get-project.sh)"
#sudo sh get-project.sh
sudo rm get-project.sh
sudo usermod -aG docker $USER

echo "\nMot de passe root:\n"
su $USER
