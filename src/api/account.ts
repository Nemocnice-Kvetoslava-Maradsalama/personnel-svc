import { Response, Request } from 'express';
import * as express from "express";

export default (server: express.Application, account: any) => {
    server.get("/accounts", (request: Request, response: Response) => {
        return account.findAll().then((result: any) => response.json(result))
    });
    server.get("/account/:id", (request: Request, response: Response) => {
        return account.findByPk(request.params.id).then((result: any) => response.json(result));
    });
    server.post("/account", (request: Request, response: Response) => {
        return account.create({
            username: request.body.username,
            password: request.body.password,
            password_salt: request.body.password_salt,
            email: request.body.email,
            last_login: request.body.last_login
        }).then((result: any) => response.json(result))
    });
    server.put("/account/:id", (request: Request, response: Response) => {
        return account.update({ 
            username: request.body.username,
            password: request.body.password,
            password_salt: request.body.password_salt,
            email: request.body.email,
            last_login: request.body.last_login
        }, {
            where: {
                id: request.params.id
            }
        }).then((result: any) => response.json(result))
    });
    server.delete("/account/:id", (request: Request, response: Response) => {
        return account.destroy({
            where: {
                id: request.params.id
            }
        }).then((result: any) => response.json(result))
    });
};
