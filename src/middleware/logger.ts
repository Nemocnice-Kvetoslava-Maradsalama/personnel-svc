import { NextFunction, Response, Request } from 'express';
import config from '../config/server';
import { LOGLEVEL, Logger } from '../types';

export default (logger: Logger) => {
    return function (request: Request, response: Response, next: NextFunction) {
        if (config.logLevel == LOGLEVEL.DEBUG) {
            logger.log(`Incoming Request: [${request.method}] ${request.url}`);
        }
        next();
    };
}