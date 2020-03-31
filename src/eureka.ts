import { Eureka } from 'eureka-js-client';

import eurekaConfig from './config/eureka';

export const startEurekaClient = () => {
    const client = new Eureka(eurekaConfig);
    client.logger.level('debug');
    client.start((error) => {
        console.log(error || 'Eureka Started!');
    });
};