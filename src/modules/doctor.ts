import { Doctor as model } from '../models';

export class DoctorModule {

    public static async getAllDoctors (): Promise<any> {
        return model.findAll();
    }

    public static async getDoctorById (doctorId: string): Promise<any> {
        return model.findByPk(doctorId);
    }

    public static async addDoctor (firstname: string, lastname: string, salary: number): Promise<any> {
        return model.create({ firstname, lastname, salary });
    }

    public static async updateDoctorById (id: string, firstname: string, lastname: string, salary: number): Promise<any> {
        return model.update({ firstname, lastname, salary }, {
            where: { id }
        });
    }

    public static async deleteDoctor (id: string): Promise<void> {
        return model.destroy({
            where: { id }
        });
    }

    public static async getBaseSalary (doctorId: string): Promise<number> {
        return model.findByPk(doctorId).then((doctor: any) => doctor.salary);
    }

}