FROM node:19
#frontend

#copy and install dependencies
#use docker layers and run olny once

#install dependencies for the frontend
WORKDIR /usr/src/tmp_front
COPY package.json ./
RUN npm install -g
#RUN npm install yarn add react-scripts@latest react@latest react-dom@latest

WORKDIR /usr/src/stonks_front

#the source is already mapped in the directory

#run forntend
CMD ["npm", "start"]
