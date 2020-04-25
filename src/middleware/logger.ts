import { NextFunction, Response, Request } from 'express';
import config from '../config/server';
import { LOGLEVEL } from '../types';

export default function (request: Request, response: Response, next: NextFunction) {
    if (config.logLevel == LOGLEVEL.DEBUG) {
        console.log(`Incoming Request: [${request.method}] ${request.url}`);
    }
    next();
}