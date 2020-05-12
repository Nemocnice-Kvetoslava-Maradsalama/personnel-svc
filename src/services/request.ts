import { injectable, inject } from "inversify";
import { TYPES, Fetch } from '../types';
import { Response } from 'node-fetch';
import { LoggerService } from './logger';

@injectable()
export class RequestService {

    constructor (@inject(TYPES.Fetch) private fetch: Fetch, @inject(LoggerService) private loggerService: LoggerService) {}

    public get (url: string, authorizationHeader?: string): Promise<Response> {
        let options;
        if (authorizationHeader) {
            options = {
                method: 'GET',
                withCredentials: true,
                credentials: 'include',
                headers: {
                    'Authorization': authorizationHeader,
                }
            }
        } else {
            options = {
                method: 'GET',
            };
        }
        this.loggerService.log(`Outgoing GET request to: ${url}, with options: ` + JSON.stringify(options));
        return this.fetch(url, options);
    }

}
