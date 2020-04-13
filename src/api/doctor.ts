import { Response, Request } from 'express';
import * as express from "express";
import { DoctorModel } from '../models/doctor';

export default (server: express.Application, doctor: DoctorModel) => {
    server.get("/doctors", (request: Request, response: Response) => {
        return doctor.getAllDoctors().then((result: any) => response.json(result))
    });
    server.get("/doctor/:id", (request: Request, response: Response) => {
        return doctor.getDoctorById(request.params.id).then((result: any) => response.json(result))
    });
    server.post("/doctor", (request: Request, response: Response) => {
        const { firstname, lastname, salary } = request.body;
        return doctor.addDoctor(firstname, lastname, salary).then((result: any) => response.json(result))
    });
    server.put("/doctor/:id", (request: Request, response: Response) => {
        const { firstname, lastname, salary } = request.body;
        return doctor.updateDoctorById(request.params.id, firstname, lastname, salary).then((result: any) => response.json(result))
    });
    server.delete("/doctor/:id", (request: Request, response: Response) => {
        return doctor.deleteDoctor(request.params.id).then((result: any) => response.json(result))
    });
};
