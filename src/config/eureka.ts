import { EurekaClient } from 'eureka-js-client';

export default {
    instance: {
        app: 'personnel-svc',
        instanceId: 'one',
        hostName: 'localhost',
        ipAddr: '127.0.0.1',
        port: {
            '$': 8701,
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
        host: '172.20.0.2',
        port: 8761,
        servicePath: '/eureka/apps',
    },
}