FROM node:12

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

LABEL maintainer="Martin Hula <npm@anaworld.cz>"

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY lib/ lib/

EXPOSE 8701

CMD [ "npm", "start" ]