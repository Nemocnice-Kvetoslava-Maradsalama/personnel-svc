'use strict';

import { Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';

import config, { corsOptions } from './config/server';
import { Account, Doctor, Nurse } from './models';

import addAccountAPI from './api/account';
import addDoctorAPI from './api/doctor';
import addNurseAPI from './api/nurse';
import addSwaggerAPI from './api/swagger';

const server = express();

server.use(cors(corsOptions));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

addAccountAPI(server, Account);
addDoctorAPI(server, Doctor);
addNurseAPI(server, Nurse);
addSwaggerAPI(server);

server.get('/', (request: Request, response: Response) => {
    console.log('xxx');
    response.json({ message: 'Hello World!' });
});

export const startServer = () => {
    server.listen(config.port, config.host, () => {
        console.log(`Server up on http://${config.host}:${config.port}`);
    });
}