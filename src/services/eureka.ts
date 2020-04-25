import { Eureka } from 'eureka-js-client';
import { injectable, inject } from "inversify";
import { TYPES } from '../types';
import { LoggerService } from './logger';

@injectable()
export class EurekaService {

    constructor (@inject(TYPES.Eureka) private eurekaClient: Eureka, @inject(LoggerService) private loggerService: LoggerService) {}

    public getServiceInstanceUrl (appId: string): string {
        const instances = this.eurekaClient.getInstancesByAppId(appId);
        if (instances.length > 0) {
            return instances[0].homePageUrl || '';
        } else {
            this.loggerService.warn('EurekaService/getServiceInstanceUrl - no instances');
            return '';
        }
    }

}