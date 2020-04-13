import { Response, Request } from 'express';
import * as express from "express";
import { AccountModel } from '../models/account';

export default (server: express.Application, account: AccountModel) => {
    server.get("/accounts", (request: Request, response: Response) => {
        return account.getAllAccounts().then((result: any) => response.json(result))
    });
    server.get("/account/:id", (request: Request, response: Response) => {
        return account.getAccountById(request.params.id).then((result: any) => response.json(result));
    });
    server.post("/account", (request: Request, response: Response) => {
        const { username, password, email } = request.body;
        return account.addAccount(username, password, email).then((result: any) => response.json(result))
    });
    server.put("/account/:id", (request: Request, response: Response) => {
        const { username, password, email } = request.body;
        return account.updateAccountById(request.params.id, username, password, email).then((result: any) => response.json(result));
    });
    server.delete("/account/:id", (request: Request, response: Response) => {
        return account.deleteAccount(request.params.id).then((result: any) => response.json(result))
    });
};
