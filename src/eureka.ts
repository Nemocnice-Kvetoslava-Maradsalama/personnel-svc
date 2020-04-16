import { Eureka } from 'eureka-js-client';

import eurekaConfig from './config/eureka';

export const instantiateEurekaClient = (): Eureka => {
    const client = new Eureka(eurekaConfig);
    client.start((error) => {
        console.log(error || 'Eureka Started!');
    });
    return client;
};