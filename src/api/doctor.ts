import { Response, Request } from 'express';
import * as express from "express";
import { DoctorModel } from '../models/doctor';
import { Logger } from '../types';

export default (server: express.Application, logger: Logger, doctor: DoctorModel) => {
    server.get("/doctors", (request: Request, response: Response) => {
        return doctor.getAllDoctors()
            .then((result: any) => response.json(result))
            .catch((error: string) => {
                logger.error(error);
                response.status(500).send('Something broke!');
            });
    });
    server.get("/doctor/:id", (request: Request, response: Response) => {
        return doctor.getDoctorById(request.params.id)
            .then((result: any) => response.json(result))
            .catch((error: string) => {
                logger.error(error);
                response.status(500).send('Something broke!');
            });
    });
    server.get("/doctor/:id/drug-level", (request: Request, response: Response) => {
        return doctor.getDrugLevel(request.params.id)
            .then((result: any) => response.json(result))
            .catch((error: string) => {
                logger.error(error);
                response.status(500).send('Something broke!');
            });
    });
    server.post("/doctor", (request: Request, response: Response) => {
        const { firstname, lastname, salary, drugLevel } = request.body;
        if ([firstname, lastname, salary, drugLevel].some((value) => !value)) {
            logger.warn('Missing required parameters');
            response.status(400).send('Missing required parameters');
            return;
        }
        return doctor.addDoctor(firstname, lastname, salary, drugLevel)
            .then((result: any) => response.json(result))
            .catch((error: string) => {
                logger.error(error);
                response.status(500).send('Something broke!');
            });
    });
    server.put("/doctor/:id", (request: Request, response: Response) => {
        const { firstname, lastname, salary, drugLevel } = request.body;
        if ([firstname, lastname, salary, drugLevel].some((value) => !value)) {
            logger.warn('Missing required parameters');
            response.status(400).send('Missing required parameters');
            return;
        }
        return doctor.updateDoctorById(request.params.id, firstname, lastname, salary, drugLevel)
            .then((result: any) => response.json(result))
            .catch((error: string) => {
                logger.error(error);
                response.status(500).send('Something broke!');
            });
    });
    server.delete("/doctor/:id", (request: Request, response: Response) => {
        return doctor.deleteDoctor(request.params.id)
            .then((result: any) => response.json(result))
            .catch((error: string) => {
                logger.error(error);
                response.status(500).send('Something broke!');
            });
    });
};
