import { Response, Request } from 'express';
import * as express from "express";

import { AccountModule } from '../modules/account';

export default (server: express.Application) => {
    server.get("/accounts", (request: Request, response: Response) => {
        return AccountModule.getAllAccounts().then((result: any) => response.json(result))
    });
    server.get("/account/:id", (request: Request, response: Response) => {
        return AccountModule.getAccountById(request.params.id).then((result: any) => response.json(result));
    });
    server.post("/account", (request: Request, response: Response) => {
        const { username, password, email } = request.body;
        return AccountModule.addAccount(username, password, email).then((result: any) => response.json(result))
    });
    server.put("/account/:id", (request: Request, response: Response) => {
        const { username, password, email } = request.body;
        return AccountModule.updateAccountById(request.params.id, username, password, email).then((result: any) => response.json(result));
    });
    server.delete("/account/:id", (request: Request, response: Response) => {
        return AccountModule.deleteAccount(request.params.id).then((result: any) => response.json(result))
    });
};
