import { Container } from "inversify";
import { TYPES, Bcrypt, Jwt } from "./types";
import { TYPES as modelTypes, Account, Doctor } from './models/define/types';

import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import { AuthenticationModule } from './modules/authentication';
import { SequelizeModel } from './models/types';
import { Account as accountSequelizeModel, Doctor as doctorSequelizeModel } from './models';
import { AccountModel } from './models/account';
import { DoctorModel } from './models/doctor';
import { SalaryModule } from './modules/salary';
import { PatientService } from './services/patient';

const myContainer = new Container();
myContainer.bind<Bcrypt>(TYPES.Bcrypt).toConstantValue(bcrypt);
myContainer.bind<Jwt>(TYPES.Jwt).toConstantValue(jwt);

myContainer.bind<SequelizeModel<Account>>(modelTypes.AccountSequelizeModel).toConstantValue(accountSequelizeModel);
myContainer.bind<SequelizeModel<Doctor>>(modelTypes.DoctorSequelizeModel).toConstantValue(doctorSequelizeModel);
myContainer.bind<AccountModel>(AccountModel).toSelf();
myContainer.bind<DoctorModel>(DoctorModel).toSelf();

myContainer.bind<AuthenticationModule>(AuthenticationModule).toSelf();
myContainer.bind<SalaryModule>(SalaryModule).toSelf();

myContainer.bind<PatientService>(PatientService).toSelf();

export default { 
    accountModel: myContainer.get<AccountModel>(AccountModel),
    doctorModel: myContainer.get<DoctorModel>(DoctorModel),
    authenticationModule: myContainer.get<AuthenticationModule>(AuthenticationModule),
    salaryModule: myContainer.get<SalaryModule>(SalaryModule)
};