import { Response, Request } from 'express';
import * as express from "express";
import { SalaryModule } from '../modules/salary';
import { AuthenticationModule } from '../modules/authentication';
import { Logger } from '../types';

export default (server: express.Application, logger: Logger, salaryModule: SalaryModule, authenticationModule: AuthenticationModule) => {
    server.get("/salary/:doctor_id", async (request: Request, response: Response) => {
        if ([request.headers.authorization].some((value) => !value)) {
            logger.warn('Missing required authorization header');
            response.status(400).send('Missing required authorization header');
            return;
        }
        const isAuthenticated = await authenticationModule.validate(request.headers.authorization);
        if (!isAuthenticated) {
            logger.warn('Invalid authentication header: ' + request.headers.authorization);
            response.status(401).send('Unauthorized');
            return;
        }
        return salaryModule.calculateSalary(request.params.doctor_id, <string>request.headers.authorization)
            .then((salary: number) => response.json(salary))
            .catch((error: string) => {
                logger.error(error);
                response.status(500).send('Something broke!');
            });
    });
};