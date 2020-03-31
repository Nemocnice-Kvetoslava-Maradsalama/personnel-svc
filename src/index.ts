import { startEurekaClient } from './eureka';
import { startServer } from './server';

const enableEurekaClient = false;

if (enableEurekaClient) {
    startEurekaClient();
}

startServer();