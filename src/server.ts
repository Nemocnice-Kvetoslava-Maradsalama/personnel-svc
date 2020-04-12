'use strict';

import { Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';

import config, { corsOptions } from './config/server';

import addAccountAPI from './api/account';
import addDoctorAPI from './api/doctor';
import addSalaryAPI from './api/salary';
import addSwaggerAPI from './api/swagger';

const server = express();

server.use(cors(corsOptions));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

addAccountAPI(server);
addDoctorAPI(server);
addSalaryAPI(server);
addSwaggerAPI(server);

server.get('/', (request: Request, response: Response) => {
    response.json({ message: 'Hello World!' });
});

export const startServer = () => {
    server.listen(config.port, config.host, () => {
        console.log(`Server up on http://${config.host}:${config.port}`);
    });
}