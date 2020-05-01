import { Response, Request } from 'express';
import * as express from "express";
import { AuthenticationModule } from '../modules/authentication';
import { Logger } from '../types';

export default (server: express.Application, logger: Logger, authenticationModule: AuthenticationModule) => {
    server.post("/auth/login", (request: Request, response: Response) => {
        if ([request.body.username, request.body.password].some((value) => !value)) {
            logger.warn('Missing required parameters');
            response.status(400).send('Missing required parameters');
            return;
        }
        return authenticationModule.login(request.body.username, request.body.password)
            .then((result: any) => response.json(result))
            .catch((error: string) => {
                logger.error(error);
                response.status(500).send('Something broke!');
            });
    });
    server.get("/auth/validate-token", (request: Request, response: Response) => {
        if ([request.headers.authorization].some((value) => !value)) {
            logger.warn('Missing required authorization header');
            response.status(400).send('Missing required authorization header');
            return;
        }
        return authenticationModule.validate(request.headers.authorization)
            .then((result: boolean) => response.json(result))
            .catch((error: string) => {
                logger.error(error);
                response.status(500).send('Something broke!');
            });
    });
    server.get("/auth/validate-doctor", (request: Request, response: Response) => {
        if ([request.headers.authorization].some((value) => !value)) {
            logger.warn('Missing required authorization header');
            response.status(400).send('Missing required authorization header');
            return;
        }
        return authenticationModule.validateDoctor(request.headers.authorization)
            .then((result: boolean) => response.json(result))
            .catch((error: string) => {
                logger.error(error);
                response.status(500).send('Something broke!');
            });
    })
};
