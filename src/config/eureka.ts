import { EurekaClient } from 'eureka-js-client';
import * as env from 'env-var';

export default {
    instance: {
        app: env.get('EUREKA_APP').default('personnel-svc').asString(),
        instanceId: env.get('EUREKA_ID').default('personnel-one').asString(),
        hostName: env.get('SERVER_HOSTNAME').default('localhost').asString(),
        ipAddr: env.get('SERVER_IP').default('127.0.0.1').asString(),
        port: {
            '$': env.get('SERVER_PORT').default(8701).asPortNumber(),
            '@enabled': true,
        },
        vipAddress: 'personnel-svc',
        dataCenterInfo: {
            '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
            name: 'MyOwn' as EurekaClient.DataCenterName,
        },
        registerWithEureka: true,
        fetchRegistry: true
    },
    eureka: {
        host: env.get('EUREKA_HOST').default('172.24.0.2').asString(),
        port: env.get('EUREKA_PORT').default(8761).asPortNumber(),
        servicePath: '/eureka/apps',
    },
}