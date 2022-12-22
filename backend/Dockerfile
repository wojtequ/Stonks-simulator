FROM node:19
#backend

#copy and install dependencies
#use docker layers and run olny once

#install dependencies for the back
#WORKDIR /usr/src/packages_back
#COPY package.json ./
#RUN npm install
#RUN chmod -R 777 /usr/src/packages_back
#ENV PATH /usr/src/packages_back/node_modules/.bin:$PATH
#RUN npm install nodemon --save
#for so:setme reason it is not working

#select directory for backend
WORKDIR /usr/src/stonks_back
COPY package.json ./
RUN npm install
#the source is already mapped in the directory

#run backend
CMD ["npm", "start"]
