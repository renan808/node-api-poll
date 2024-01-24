FROM node:18
WORKDIR /usr/src/node-api-survey
COPY ./package.json .
RUN npm install --only=prod
