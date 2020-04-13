import { Response, Request } from 'express';
import * as express from "express";

import { AuthenticationModule } from '../modules/authentication';

export default (server: express.Application) => {
    server.post("/auth/login", (request: Request, response: Response) => {
        return AuthenticationModule.login(request.body.username, request.body.password).then((result: any) => response.json(result))
    });
    server.post("/auth/validate-token", (request: Request, response: Response) => {
        return AuthenticationModule.validateToken(request.body.token).then((result: any) => response.json(result))
    });
};
