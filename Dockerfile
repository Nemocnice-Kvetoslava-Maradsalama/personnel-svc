FROM node:12

LABEL maintainer="Martin Hula <npm@anaworld.cz>"

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY src/ src/

EXPOSE 8080

CMD [ "node", "src/server.js" ]