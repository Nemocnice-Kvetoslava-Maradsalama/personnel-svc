export default {
    instance: {
        app: 'personnel-svc',
        instanceId: 'one',
        hostName: 'localhost',
        ipAddr: '127.0.0.1',
        port: {
            '$': 8701,
            '@enabled': 'true',
        },
        vipAddress: 'personnel-svc',
        dataCenterInfo: {
            '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
            name: 'MyOwn',
        },
        registerWithEureka: true,
        fetchRegistry: true
    },
    eureka: {
        host: 'localhost',
        port: 8761,
        servicePath: '/eureka/apps',
    },
}