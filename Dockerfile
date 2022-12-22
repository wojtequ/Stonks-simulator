FROM node:19
#frontend

#copy and install dependencies
#use docker layers and run olny once

#install dependencies for the frontend
#WORKDIR /usr/src/packages_front
#COPY package.json ./
#RUN npm install
#RUN chmod -R 777 /usr/src/packages_front
#ENV PATH /usr/src/packages_front/node_modules/.bin:$PATH
#RUN npm install yarn add react-scripts@latest react@latest react-dom@latest

WORKDIR /usr/src/stonks_front
COPY package.json ./
RUN npm install
#the source is already mapped in the directory

#run forntend
CMD ["npm", "start"]
