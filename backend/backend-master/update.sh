#!/bin/sh

echo "\n"
echo "                    *****************************************"
echo "                    *          Connection au dépot          *"
echo "                    *****************************************"

ssh -T git@gitlab.com
if [ $? -eq 0 ]; then
  echo "Connection ok"
else
  ssh-keygen
  echo "                    ***************************************************"
  cat $HOME/.ssh/id_rsa.pub
  echo "                    ***************************************************"
  read -p "Veuillez ajouter la clé ssh à votre compte gitlab.com puis appuyez sur n'importe quelle touche pour continuer..." end
fi

echo "\n"
echo "                    ************************************************"
echo "                    *          Arret des container docker          *"
echo "                    ************************************************"
cd $HOME/backend && docker-compose down

echo "\n"
echo "                    *********************************************"
echo "                    *          Mise a jour des sources          *"
echo "                    *********************************************"
cd $HOME/backend && docker login registry.gitlab.com
cd $HOME/backend && git pull
cd $HOME/backend && docker-compose pull
sudo chmod +x bin/console

echo "\n"
echo "                    *****************************************************"
echo "                    *          Redémarage des container docker          *"
echo "                    *****************************************************"
cd $HOME/backend && docker-compose up -d --build

echo "\n"
echo "                    ***********************************************************"
echo "                    *          Mise à jour des sources et des Vendor          *"
echo "                    ***********************************************************"
cd $HOME/backend && docker-compose run --rm app composer install
sudo chmod +x bin/console
cd $HOME/backend && docker-compose run --rm app bin/console doctrine:schema:update -f
cd $HOME/backend && docker-compose run --rm app bin/console doctrine:fixtures:load --append
