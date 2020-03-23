FROM node:12

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

ENV PGUSER=dbuser
ENV PGHOST=postgres_container
ENV PGPASSWORD=secretpassword
ENV PGDATABASE=mydb
ENV PGPORT=5432

LABEL maintainer="Martin Hula <npm@anaworld.cz>"

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY lib/ lib/

EXPOSE 8701

CMD [ "npm", "start" ]