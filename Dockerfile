FROM node:19
#frontend

#select directory for frontend
#copy and install dependencies

WORKDIR /usr/src/stonks_front
COPY package.json ./
RUN npm install
#the source is already mapped in the directory

#run forntend
CMD ["npm", "start"]
