import { Eureka } from 'eureka-js-client';

import eurekaConfig from './config/eureka';

export const instantiateEurekaClient = (): Eureka => {
    const client = new Eureka(eurekaConfig);
    client.start((error) => {
        if (error) {
            console.error(error);
        } else {
            console.log('Eureka Started!');
            console.log('Registered with IP: ' + eurekaConfig.instance.ipAddr);
        }
    });
    return client;
};