FROM node:19
WORKDIR /usr/src/node-api-survey
COPY ./package.json .
RUN npm install --only=prod
COPY ./dist ./dist
EXPOSE 5000
CMD npm start