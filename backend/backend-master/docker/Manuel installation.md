# CESI Scheduler 

## Mis en place de l'environement

###Installer une raspbian
Se reporter au tutoriel suivant pour la récupération de l'image et l'installation sur la carte SD de la raspberry : 

https://espace-raspberry-francais.fr/Debuter-sur-Raspberry-Francais/Installation-Raspbian-et-premier-demarrage-Raspberry-Pi-Francais/


###Autoriser la connexion ssh
Dans l'invite de commande, se logger avec les identifiants par défaut (pi/raspberry)
entrez ensuite la commande ```` sudo raspi-config```` pour ouvrir le gestionnaire de configuration.

Sélectionnez ````Interfacing Options```` >> ````SSH```` >> ````YES```` 

### (Optionnel) - Changer le mapping clavier
Retournez dans le gestionnaire de configuration comme vu précédemment puis: 

Sélectionnez ````Localisation Options```` >> ````Change Keyboard Layout```` >> ````Generic```` >> ````Other```` >> ````French```` >> ````French```` 
Laissez les deux dernières options par defaut
###Ajout de fonctionalités depuis l'exterieur du container app
```composer [install/update]```  

```bc [fonctionnalités symfony]``` 

```bye``` stoppera proprement la raspberry 


### Récupérer les scripts d'initialisation et de mise en place des container Docker
   
Les deux scripts d'initialisations se trouvent à la racine de ce projet. 
Dans un soucis pratique, ils aussi mis à disposition sur le dépôt gitlab dans l'onglet "en "snippet" : https://gitlab.com/cesiAP18/cesisheduler/backend/snippets   


Connectez vous en ssh à votre raspberry 4 et creez deux fichers que vous appellerez script_1 et script_2.

```touch script_1 script_2```

Ajoutez leur les droits d'execution:

```chmod +x script_1 script_2```


Remplissez-les avec le code trouvé en snippet du projet "backend"

Script_1: https://gitlab.com/cesiAP18/cesisheduler/backend/snippets/1925635

Script_2: https://gitlab.com/cesiAP18/cesisheduler/backend/snippets/1925636


###Ajout du host

Ouvrez le fichier host à l'aide d'un éditeur de texte:
```sudo nano /etc/hosts```

Puis ajoutez la ligne ```127.0.0.1    cesibackend```

Enfin, quittez l'editeur de texte (Ctrl + X)


###Execution des script
L'ordre d'exécution des scripts est important, le premier script créé le group "docker" et l'ajoute à l'utilisateur courant. 
Pour que ces droits soient appliqués, il est nécessaire se recconecter avec le même utilisateur.
C'est la dernière commande du premier script ce qui en stop l'execution. 
D'où l'utilité d'un second script.

Pour exécuter le premier script lancez la commande :
```` ./script_1.sh````

Une fois le script_1 achevé, vous vous trouverez dans un nouveau TTY.
Exécutez le script_2
```` ./script_2.sh````

