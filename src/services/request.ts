import { injectable, inject } from "inversify";
import { TYPES, Fetch } from '../types';
import { Response } from 'node-fetch';

@injectable()
export class RequestService {

    constructor (@inject(TYPES.Fetch) private fetch: Fetch) {}

    public get (url: string): Promise<Response> {
        return this.fetch(url);
    }

}
