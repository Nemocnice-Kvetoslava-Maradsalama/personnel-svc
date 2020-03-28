import { Response, Request } from 'express';
import * as express from "express";

export default (server: express.Application, doctor: any) => {
    server.get("/doctors", (request: Request, response: Response) => {
        return doctor.findAll().then((result: any) => response.json(result))
    });
    server.get("/doctor/:id", (request: Request, response: Response) => {
        return doctor.findByPk(request.params.id).then((result: any) => response.json(result))
    });
    server.post("/doctor", (request: Request, response: Response) => {
        return doctor.create({
            firstname: request.body.firstname,
            lastname: request.body.lastname
        }).then((result: any) => response.json(result))
    });
    server.put("/doctor/:id", (request: Request, response: Response) => {
        return doctor.update({
            firstname: request.body.firstname,
            lastname: request.body.lastname
        }, {
            where: {
                id: request.params.id
            }
        }).then((result: any) => response.json(result))
    });
    server.delete("/doctor/:id", (request: Request, response: Response) => {
        return doctor.destroy({
            where: {
                id: request.params.id
            }
        }).then((result: any) => response.json(result))
    });
};
