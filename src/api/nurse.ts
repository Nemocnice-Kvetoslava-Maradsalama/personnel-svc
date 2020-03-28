import { Response, Request } from 'express';
import * as express from "express";

export default (server: express.Application, nurse: any) => {
    server.get("/nurses", (request: Request, response: Response) => {
        return nurse.findAll().then((result: any) => response.json(result))
    });
    server.get("/nurse/:id", (request: Request, response: Response) => {
        return nurse.findByPk(request.params.id).then((result: any) => response.json(result))
    });
    server.post("/nurse", (request: Request, response: Response) => {
        return nurse.create({
            firstname: request.body.firstname,
            lastname: request.body.lastname
        }).then((result: any) => response.json(result))
    });
    server.put("/nurse/:id", (request: Request, response: Response) => {
        return nurse.update({
            firstname: request.body.firstname,
            lastname: request.body.lastname
        }, {
            where: {
                id: request.params.id
            }
        }).then((result: any) => response.json(result))
    });
    server.delete("/nurse/:id", (request: Request, response: Response) => {
        return nurse.destroy({
            where: {
                id: request.params.id
            }
        }).then((result: any) => response.json(result))
    });
};
