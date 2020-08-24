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

echo "\n"
echo "                    **************************************************"
echo "                    *          Chargement des images docker          *"
echo "                    **************************************************"
cd $HOME/backend && docker login registry.gitlab.com
cd $HOME/backend && docker-compose up -d

echo "\n"
echo "                    **********************************************"
echo "                    *          Installation des vendors          *"
echo "                    **********************************************"
cd $HOME/backend && docker-compose run --rm app composer install
sudo chmod +x bin/console

echo "\n"
echo "                    *********************************************"
echo "                    *          Execution des migration          *"
echo "                    *********************************************"
cd $HOME/backend && docker-compose run --rm app bin/console doctrine:schema:update -f

echo "\n"
echo "                    ***************************************"
echo "                    *          Ajout des données          *"
echo "                    ***************************************"
cd $HOME/backend && docker-compose run --rm app bin/console doctrine:fixtures:load --append
