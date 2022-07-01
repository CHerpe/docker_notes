FROM node:alpine

WORKDIR /app

# on récupère tous nos fichiers pour les mettre dans le container
# on met le package.json à part - de cette manière, en cas de modif du code package.json reste inchangé et donc c'est la verison cachée qui sera utilisée et donc npm install ne sera pas lancé
COPY ./package.json .

RUN npm install

COPY . .

# on doit ajouter cette variable d'environement car sinon notre container ne trouve pas nodemon. 
# $PATH permet d'ajouter au contenu existant de PATH plutot que de l'écraser
ENV PATH=$PATH:/app/node_modules/.bin

CMD ["nodemon", "src/app.js"]