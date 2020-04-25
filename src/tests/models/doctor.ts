import 'reflect-metadata';
import { expect } from 'chai';
import * as sinon from 'sinon';
import { DoctorModel } from '../../models/doctor';

describe('DoctorModel', () => {
    let instance: DoctorModel, model;
    beforeEach(() => {
        model = {
            findAll: sinon.stub(),
            findByPk: sinon.stub(),
            create: sinon.stub(),
            update: sinon.stub(),
            destroy: sinon.stub()
        };
        instance = new DoctorModel(model);
    });
    describe('getAllDoctors', () => {
        it('', async () => {
            const allDoctors = Symbol('all doctors');
            model.findAll.returns(allDoctors);
            const result = await instance.getAllDoctors();
            expect(result).to.equal(allDoctors);
        });
    });
    describe('getDoctorById', () => {
        it('', async () => {
            const doctor = Symbol('doctor');
            model.findByPk.returns(doctor);
            const doctorId = 'doctorId';
            const result = await instance.getDoctorById(doctorId);
            expect(result).to.equal(doctor);
            expect(model.findByPk.calledWith(doctorId)).to.be.true;
        });
    });
    describe('addDoctor', () => {
        it('', async () => {
            const doctor = {
                field: 'value'
            };
            model.create.returns(doctor);
            const firstname = 'user1';
            const lastname = 'pawd1';
            const salary = 104000;
            const drugLevel = 1;
            const result = await instance.addDoctor(firstname, lastname, salary, drugLevel);
            expect(result).to.equal(doctor);
            expect(model.create.calledWith({ firstname, lastname, salary, drugLevel })).to.be.true;
        });
    });
    describe('updateDoctorById', () => {
        it('', async () => {
            const doctor = {
                field: 'value'
            };
            model.update.returns(doctor);
            const id = 'idone';
            const firstname = 'user1';
            const lastname = 'pawd1';
            const salary = 104000;
            const drugLevel = 1;
            const result = await instance.updateDoctorById(id, firstname, lastname, salary, drugLevel);
            expect(result).to.equal(doctor);
            expect(model.update.calledWith({ firstname, lastname, salary, drugLevel }, { where: { id } })).to.be.true;
        });
    });
    describe('deleteDoctor', () => {
        it('', async () => {
            const destroyed = 1;
            model.destroy.returns(destroyed);
            const id = 'someid';
            const result = await instance.deleteDoctor(id);
            expect(result).to.equal(destroyed);
            expect(model.destroy.calledWith({ where: { id } })).to.be.true;
        });
    });
    describe('getBaseSalary', () => {
        it('', async () => {
            const doctor = {
                salary: 144444
            };
            model.findByPk.returns(Promise.resolve(doctor));
            const id = 'someid';
            const result = await instance.getBaseSalary(id);
            expect(result).to.equal(doctor.salary);
            expect(model.findByPk.calledWith(id)).to.be.true;
        });
    });
});
