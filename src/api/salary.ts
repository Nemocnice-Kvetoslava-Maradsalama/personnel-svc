import { Response, Request } from 'express';
import * as express from "express";
import { SalaryModule } from '../modules/salary';
import { Logger } from '../types';

export default (server: express.Application, logger: Logger, salaryModule: SalaryModule) => {
    server.get("/salary/:doctor_id", (request: Request, response: Response) => {
        return salaryModule.calculateSalary(request.params.doctor_id)
            .then((salary: number) => response.json(salary))
            .catch((error: string) => {
                logger.error(error);
                response.status(500).send('Something broke!');
            });
    });
};