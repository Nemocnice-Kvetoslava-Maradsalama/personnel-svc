import { Response, Request } from 'express';
import * as express from "express";
import { AccountModel } from '../models/account';
import { Logger } from '../types';

export default (server: express.Application, logger: Logger, account: AccountModel) => {
    server.get("/accounts", (request: Request, response: Response) => {
        return account.getAllAccounts()
            .then((result: any) => response.json(result))
            .catch((error: string) => {
                logger.error(error);
                response.status(500).send('Something broke!');
            });
    });
    server.get("/account/:id", (request: Request, response: Response) => {
        return account.getAccountById(request.params.id)
            .then((result: any) => response.json(result))
            .catch((error: string) => {
                logger.error(error);
                response.status(500).send('Something broke!');
            });
    });
    server.post("/account", (request: Request, response: Response) => {
        const { username, password, email } = request.body;
        if ([username, password, email].some((value) => !value)) {
            logger.warn('Missing required parameters');
            response.status(400).send('Missing required parameters');
            return;
        }
        return account.addAccount(username, password, email)
            .then((result: any) => response.status(201).json(result))
            .catch((error: string) => {
                logger.error(error);
                response.status(500).send('Something broke!');
            });
    });
    server.put("/account/:id", (request: Request, response: Response) => {
        const { username, password, email } = request.body;
        if ([username, password, email].some((value) => !value)) {
            logger.warn('Missing required parameters');
            response.status(400).send('Missing required parameters');
            return;
        }
        return account.updateAccountById(request.params.id, username, password, email)
            .then((result: any) => response.status(201).json(result))
            .catch((error: string) => {
                logger.error(error);
                response.status(500).send('Something broke!');
            });
    });
    server.delete("/account/:id", (request: Request, response: Response) => {
        return account.deleteAccount(request.params.id)
            .then((result: any) => response.json(result))
            .catch((error: string) => {
                logger.error(error);
                response.status(500).send('Something broke!');
            });
    });
};
