import { injectable, inject } from "inversify";
import { TYPES, Fetch } from '../types';
import { Response } from 'node-fetch';
import { LoggerService } from './logger';

@injectable()
export class RequestService {

    constructor (@inject(TYPES.Fetch) private fetch: Fetch, @inject(LoggerService) private loggerService: LoggerService) {}

    public get (url: string): Promise<Response> {
        this.loggerService.log(`Outgoing GET request to: ${url}`);
        return this.fetch(url);
    }

}
