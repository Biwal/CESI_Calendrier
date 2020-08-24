#!/bin/sh
echo "\n"
echo "                    ***************************************************"
echo "                    *          Récupération du dépot backend          *"
echo "                    ***************************************************"

ssh -T git@gitlab.com
if [ $? -eq 0 ]; then
  git clone git@gitlab.com:cesiAP18/cesisheduler/backend.git
else
  ssh-keygen
  echo "                    ***************************************************"
  cat $HOME/.ssh/id_rsa.pub
  echo "                    ***************************************************"
  read -p "Veuillez ajouter la clé ssh à votre compte gitlab.com puis appuyez sur n'importe quelle touche pour continuer..." end
  git clone git@gitlab.com:cesiAP18/cesisheduler/backend.git
fi

sudo chmod +x backend/bin/console

echo "\n"
echo "                    **************************************************"
echo "                    *          Chargement des images docker          *"
echo "                    **************************************************"
cd $HOME/backend && docker login registry.gitlab.com
cd $HOME/backend && docker-compose up -d --build

echo "\n"
echo "                    **********************************************"
echo "                    *          Installation des vendors          *"
echo "                    **********************************************"
cd $HOME/backend && docker-compose run --rm app composer install
sudo chmod +x bin/console

echo "\n"
echo "                    **********************************************"
echo "                    *          Création base de données          *"
echo "                    **********************************************"
cd $HOME/backend && docker-compose run --rm app bin/console doctrine:schema:update -f

echo "\n"
echo "                    ***************************************"
echo "                    *          Ajout des données          *"
echo "                    ***************************************"
cd $HOME/backend && docker-compose run --rm app bin/console doctrine:fixtures:load --append
