import { Container } from "inversify";
import { TYPES, Bcrypt, Jwt, Fetch, Config, Logger } from "./types";
import { TYPES as modelTypes, Account, Doctor } from './models/define/types';
import config from './config/server';

import * as env from 'env-var';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import fetch from 'node-fetch';

import { AuthenticationModule } from './modules/authentication';
import { SequelizeModel } from './models/types';
import { Account as accountSequelizeModel, Doctor as doctorSequelizeModel } from './models';
import { AccountModel } from './models/account';
import { DoctorModel } from './models/doctor';
import { SalaryModule } from './modules/salary';
import { PatientService } from './services/patient';
import { instantiateEurekaClient } from './eureka';
import { Eureka } from 'eureka-js-client';
import { RequestService } from './services/request';
import { EurekaService } from './services/eureka';
import { LoggerService } from './services/logger';

export const myContainer = new Container();
myContainer.bind<Config>(TYPES.Config).toConstantValue(config);

myContainer.bind<Bcrypt>(TYPES.Bcrypt).toConstantValue(bcrypt);
myContainer.bind<Fetch>(TYPES.Fetch).toFunction(fetch);
myContainer.bind<Jwt>(TYPES.Jwt).toConstantValue(jwt);

console.log(env.get('NODE_ENV').asString());
if (env.get('NODE_ENV').asString() != 'test') {
    const eurekaClient = instantiateEurekaClient();
    myContainer.bind<Eureka>(TYPES.Eureka).toConstantValue(eurekaClient);
}

myContainer.bind<SequelizeModel<Account>>(modelTypes.AccountSequelizeModel).toConstantValue(accountSequelizeModel);
myContainer.bind<SequelizeModel<Doctor>>(modelTypes.DoctorSequelizeModel).toConstantValue(doctorSequelizeModel);
myContainer.bind<AccountModel>(AccountModel).toSelf();
myContainer.bind<DoctorModel>(DoctorModel).toSelf();

myContainer.bind<AuthenticationModule>(AuthenticationModule).toSelf();
myContainer.bind<SalaryModule>(SalaryModule).toSelf();

myContainer.bind<Logger>(LoggerService).toSelf();
myContainer.bind<EurekaService>(EurekaService).toSelf();
myContainer.bind<PatientService>(PatientService).toSelf();
myContainer.bind<RequestService>(RequestService).toSelf();

export default () => ({ 
    accountModel: myContainer.get<AccountModel>(AccountModel),
    doctorModel: myContainer.get<DoctorModel>(DoctorModel),
    authenticationModule: myContainer.get<AuthenticationModule>(AuthenticationModule),
    salaryModule: myContainer.get<SalaryModule>(SalaryModule),
    LoggerService: myContainer.get<Logger>(LoggerService)
});
