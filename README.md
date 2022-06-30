# Notes bases docker

*Ces notes ot pour objectif de servir de mémo de la formation Dyma Docker*

## Pourquoi faire ?

- Simplifier l’installation d’une application
- - Définit un environnement dans une image pour la faire tourner partout
- Simplifier le déploiement
- - Puisque tout est définit à l’avance dans l’image : pas de soucis !
- Réduire les couts
- - Mettre l’app dans un container permet de faire tourner plusieurs fois l’application de manière indépendante sur le même serveur ce qui fait que même si une app crash, les utilisateurs ont encore accès au service.
- - Permet d’avoir besoin de moins de serveurs aussi


## Fonctionnement

Schéma explicatif de l'interet de docker vs les VMs :

![Schéma explicatif de l'interet de docker vs les VMs](./images/vms_vs_docker.png)

=> Chaque VM embarque son système d'exploitation ce qui fait beaucoup de fichiers dupliqués qui prennent de la place à terme.  
=> Si l'on veut installer ou updater un programme sur toutes les VMs, il faut le faire cas pas cas à la main VS une seule fois sur Docker

## Ecosystème

Schéma de la base d l'écosystème Docker :

![Schéma de la base d l'écosystème Docker](./images/ecosysteme.png)

- Le docker daemon est le coeur de Docker.
- - Interractions possibles via l'API
- - Mise à disposition d'un CLI pour simplifier l'affaire
- - Il construit les images et lance les containers
- - Il accède au registry pour rechercher des images toutes faites (node, ect)

![Schéma 2 de la base d l'écosystème Docker](./images/ecosysteme2.png)

## Dockerfile

### Outil pour créer des images  
- Dans 99% des cas on part d'une image pré-existante (image de base) qu'on vient modifier / ajouter des actions
- Le dockerfile est interprété de haut en bas et une image intermédiaire est crée à chaque ligne jusqu'à l'image finale. Pourquoi ?
- - Pour pouvoir créer un container intermédiaire dans lequel executer ce qu'on a à éxecuter car une image ne peut pas executer de commandes.
- Le dockerfile est lié à un contexte : le dossier dans lequel il est.
- - On pourra descendre dans des sous dossier mais jamais remonter hors du contexte
- On peut aussi créer une image depuis un container (alors que normalement c'est l'inverse !) - mais peu utile
- - On peut utiliser `docker container commit`

### Instructions: Dockerfile
- **FROM**
- **RUN** 
- **COPY / ADD**
- - On préfère utiliser COPY
- **CMD / ENTRYPOINT**
- - La différence ?
- - CMD peut etre overridé par l'appel de l'image par une autre fonction
- - ENTRYPOINT bloque la fonction de lancement
- **WORKDIR**
- **ARG**
- - On définit des variables qu'on assigne à l'appel docker et qui auront donc cette valeur partout 
- **ENV**
- - Comme ARG mais qu'on récupère ensuite dans le container
- **LABEL**
- - Permet de stocker des infos sur l'image qu'on pourra inspecter via `docker image inspect ID_IMAGE`

## Commandes de base

**Lister les containers**
- `Docker ps` (container en cours)
- `Docker ps -a` (all)

**Comparer l'état à l'état de lancement**
- `Docker container diff ID_CONTAINER`

**Accéder au terminal d'un container en execution**
- `Docker container attach ID_CONTAINER`

**Lancer un container**
- `Docker container start ID_CONTAINER` (simple)
- `Docker container start -ai ID_CONTAINER` (avec accès terminal)

**Renommer un container**
- `Docker container rename ID_CONTAINER NEW_NAME`

**Créer un container**
- `Docker container create IMAGE_NAME` (simple)
- `Docker container create -it IMAGE_NAME` (permet accès terminal)

**Supprimer tous les containers**
- `Docker container prune`

**Supprimer tous les images**
- `Docker image prune`

**Supprimer tous les containers et images**
- `Docker system prune`

**Voir processus en cours sur un container**
- `Docker contianer top ID_CONTAINER`

**Transférer fichier local - container**
- `Docker container cp LOCAL_FILE ID_CONTAINER:TARGET_PATH`

**Stopper un container**
- `Docker container stop ID_CONTAINER`
- `Docker container kill ID_CONTAINER` (plus violent)

**Créer une image custom**
- `Docker build -t IMAGE_NAME:IMAGE_VERSION PATH_TO_DOCKERFILE`

**Voir les logs d'un container**
- `Docker container logs ID_CONTAINER`
- `Docker container logs -f ID_CONTAINER` pour se maintenir sur les logs 

**Voir l'historique des modifs sur l'image**
- `Docker image history ID_CONTAINER`

## Lexique

**Namespace**: espaces isolés sur un système Linux  
**Cgroups**: control groups - permet de limiter l'accès des processus aux ressources  
**Kernel**: noyau du système qui gère la répartition des capacités du hardware  
**Hypervisor**: chef d'orchestre qui répartit les ressources à plusieurs VM  
**Node**: groupement de plusieurs container qui échanges des données  
