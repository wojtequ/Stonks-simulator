FROM node:19
#backend

#copy and install dependencies
#use docker layers and run olny once

#install dependencies for the back
WORKDIR /usr/src/stonks_back
COPY package.json ./
RUN npm install -g

#RUN npm install nodemon --save
#for some reason it is not working

#select directory for backend
WORKDIR /usr/src/stonks_back

#the source is already mapped in the directory

#run backend
CMD ["npm", "start"]
