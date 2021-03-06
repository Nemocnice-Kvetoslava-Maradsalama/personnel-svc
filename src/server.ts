'use strict';

import { Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';

import config, { corsOptions } from './config/server';

import loggerMiddleware from './middleware/logger';

import addAccountAPI from './api/account';
import addAuthorizationAPI from './api/auth';
import addDoctorAPI from './api/doctor';
import addSalaryAPI from './api/salary';
import addSwaggerAPI from './api/swagger';

import buildInstances from './inversify.config';

const instances = buildInstances();
const server = express();

server.use(cors(corsOptions));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(loggerMiddleware(instances.LoggerService));

addAccountAPI(server, instances.LoggerService, instances.accountModel);
addAuthorizationAPI(server, instances.LoggerService, instances.authenticationModule);
addDoctorAPI(server, instances.LoggerService, instances.doctorModel);
addSalaryAPI(server, instances.LoggerService, instances.salaryModule, instances.authenticationModule);
addSwaggerAPI(server);

server.get('/', (request: Request, response: Response) => {
    response.json({ message: 'Hello World!' });
});

export const startServer = () => {
    server.listen(config.port, config.host, () => {
        console.log(`Server up on http://${config.host}:${config.port}`);
    });
}