import 'reflect-metadata';
import { expect } from 'chai';
import * as sinon from 'sinon';
import * as nock from 'nock';
import { myContainer } from '../../inversify.config';
import { SalaryModule } from '../../modules/salary';
import { SequelizeModel } from '../../models/types';
import { Doctor } from '../../models/define/types';
import { TYPES as modelTypes } from '../../models/define/types';
import { Eureka } from 'eureka-js-client';
import { TYPES } from '../../types';

describe('SalaryModule', () => {
    const fakeDomain = 'http://testdomain.com/';
    const childContainer = myContainer.createChild();
    const doctorMock = {
        findAll: sinon.stub(),
        findByPk: sinon.stub(),
        create: sinon.stub(),
        update: sinon.stub(),
        destroy: sinon.stub()
    };
    childContainer.bind<SequelizeModel<Doctor>>(modelTypes.DoctorSequelizeModel).toConstantValue(doctorMock);
    const eurekaMock = {
        getInstancesByAppId: sinon.stub().returns([{ homePageUrl: fakeDomain }]),
        start: sinon.stub(),
        stop: sinon.stub(),
        getInstancesByVipAddress: sinon.stub()
    };
    childContainer.bind<Eureka>(TYPES.Eureka).toConstantValue(eurekaMock);
    
    const salaryModule = childContainer.get<SalaryModule>(SalaryModule);

    describe('calculateSalary', function () {
        it('runs with expected values', async () => {
            const doctorId = 1;
            const apiEndpoint = '/interaction/doctorInteractionCount';
            const numberOfPatients = 25;
            const perPatientBonus = 2500;

            nock(fakeDomain)
                .get(apiEndpoint + '?doctorId=' + doctorId)
                .reply(200, '' + numberOfPatients);
                
            const doctorBaseSalary = 30000;
            doctorMock.findByPk.returns(Promise.resolve({ salary: doctorBaseSalary }));
            const authorizationHeader = 'Bearer ASDF';

            const salary = await salaryModule.calculateSalary('' + doctorId, authorizationHeader);
            expect(salary).to.equal(doctorBaseSalary + perPatientBonus * numberOfPatients);
        });
        it('has no bonus', async () => {
            const doctorId = 1;
            const apiEndpoint = '/interaction/doctorInteractionCount';
            const numberOfPatients = 0;
            const perPatientBonus = 2500;

            nock(fakeDomain)
                .get(apiEndpoint + '?doctorId=' + doctorId)
                .reply(200, '' + numberOfPatients);
                
            const doctorBaseSalary = 30000;
            doctorMock.findByPk.returns(Promise.resolve({ salary: doctorBaseSalary }));
            const authorizationHeader = 'Bearer ASDF';

            const salary = await salaryModule.calculateSalary('' + doctorId, authorizationHeader);
            expect(salary).to.equal(doctorBaseSalary + perPatientBonus * numberOfPatients);
        });
        it('invalid endpoint', async () => {
            const doctorId = 1;
            const doctorBaseSalary = 30000;
            doctorMock.findByPk.returns(Promise.resolve({ salary: doctorBaseSalary }));
            const authorizationHeader = 'Bearer ASDF';

            let thrownError = false;
            try {
                await salaryModule.calculateSalary('' + doctorId, authorizationHeader);
            } catch (error) {
                thrownError = true;
            }
            expect(thrownError).to.equal(true);
        });
    });
});
