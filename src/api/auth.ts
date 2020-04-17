import { Response, Request } from 'express';
import * as express from "express";
import { AuthenticationModule } from '../modules/authentication';

export default (server: express.Application, authenticationModule: AuthenticationModule) => {
    server.post("/auth/login", (request: Request, response: Response) => {
        return authenticationModule.login(request.body.username, request.body.password).then((result: any) => response.json(result))
    });
    server.get("/auth/validate-token", (request: Request, response: Response) => {
        return authenticationModule.validate(request.headers.authorization).then((result: boolean) => response.json(result))
    });
    server.get("/auth/validate-doctor", (request: Request, response: Response) => {
        return authenticationModule.validateDoctor(request.headers.authorization).then((result: boolean) => response.json(result))
    })
};
