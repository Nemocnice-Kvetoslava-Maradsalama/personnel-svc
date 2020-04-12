import { Response, Request } from 'express';
import * as express from "express";

import { DoctorModule } from '../modules/doctor';

export default (server: express.Application) => {
    server.get("/doctors", (request: Request, response: Response) => {
        return DoctorModule.getAllDoctors().then((result: any) => response.json(result))
    });
    server.get("/doctor/:id", (request: Request, response: Response) => {
        return DoctorModule.getDoctorById(request.params.id).then((result: any) => response.json(result))
    });
    server.post("/doctor", (request: Request, response: Response) => {
        const { firstname, lastname, salary } = request.body;
        return DoctorModule.addDoctor(firstname, lastname, salary).then((result: any) => response.json(result))
    });
    server.put("/doctor/:id", (request: Request, response: Response) => {
        const { id, firstname, lastname, salary } = request.body;
        return DoctorModule.updateDoctorById(id, firstname, lastname, salary).then((result: any) => response.json(result))
    });
    server.delete("/doctor/:id", (request: Request, response: Response) => {
        return DoctorModule.deleteDoctor(request.params.id).then((result: any) => response.json(result))
    });
};
