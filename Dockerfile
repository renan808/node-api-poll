FROM node:19
WORKDIR /usr/src/node-api-survey
COPY ./package.json .
RUN npm install --only=prod