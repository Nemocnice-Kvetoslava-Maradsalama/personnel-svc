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
    server.get("/doctor/:id/drug-level", (request: Request, response: Response) => {
        return doctor.getDrugLevel(request.params.id).then((result: any) => response.json(result))
    });
    server.post("/doctor", (request: Request, response: Response) => {
        const { firstname, lastname, salary, drugLevel } = request.body;
        return doctor.addDoctor(firstname, lastname, salary, drugLevel).then((result: any) => response.json(result))
    });
    server.put("/doctor/:id", (request: Request, response: Response) => {
        const { firstname, lastname, salary, drugLevel } = request.body;
        return doctor.updateDoctorById(request.params.id, firstname, lastname, salary, drugLevel).then((result: any) => response.json(result))
    });
    server.delete("/doctor/:id", (request: Request, response: Response) => {
        return doctor.deleteDoctor(request.params.id).then((result: any) => response.json(result))
    });
};
