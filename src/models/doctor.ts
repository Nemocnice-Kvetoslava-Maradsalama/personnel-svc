import { injectable, inject } from 'inversify';
import { SequelizeModel } from './types';
import { Doctor, TYPES } from './define/types';

@injectable()
export class DoctorModel {

    constructor (@inject(TYPES.DoctorSequelizeModel) private model: SequelizeModel<Doctor>) {}

    public async getAllDoctors (): Promise<Doctor[]> {
        return this.model.findAll();
    }

    public async getDoctorById (doctorId: string): Promise<Doctor> {
        return this.model.findByPk(doctorId);
    }

    public async addDoctor (firstname: string, lastname: string, salary: number): Promise<Doctor> {
        return this.model.create({ firstname, lastname, salary });
    }

    public async updateDoctorById (id: string, firstname: string, lastname: string, salary: number): Promise<Doctor> {
        return this.model.update({ firstname, lastname, salary }, {
            where: { id }
        });
    }

    public async deleteDoctor (id: string): Promise<number> {
        return this.model.destroy({
            where: { id }
        });
    }

    public async getBaseSalary (doctorId: string): Promise<number> {
        return this.model.findByPk(doctorId).then((doctor: Doctor) => doctor.salary);
    }

}