FROM node:19
#backend


#select directory for backend
#copy and install dependencies
WORKDIR /usr/src/stonks_back
COPY package.json ./
RUN npm install
#the source is already mapped in the directory

#run backend
CMD ["npm", "start"]
