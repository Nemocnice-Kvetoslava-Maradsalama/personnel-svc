import { Eureka } from 'eureka-js-client';
import { injectable, inject } from "inversify";
import { TYPES } from '../types';

@injectable()
export class EurekaService {

    constructor (@inject(TYPES.Eureka) private eurekaClient: Eureka) {}

    public getServiceInstanceUrl (appId: string): string {
        const instances = this.eurekaClient.getInstancesByAppId(appId);
        if (instances.length > 0) {
            return instances[0].homePageUrl || '';
        } else {
            return '';
        }
    }

}