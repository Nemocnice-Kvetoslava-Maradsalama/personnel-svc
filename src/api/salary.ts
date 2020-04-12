import { Response, Request } from 'express';
import * as express from "express";

import { SalaryModule } from '../modules/salary';

export default (server: express.Application) => {
    server.get("/salary/:doctor_id", (request: Request, response: Response) => {
        return SalaryModule.calculateSalary(request.params.doctor_id).then((salary: number) => response.json(salary));
    });
};
