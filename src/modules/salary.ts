import { DoctorModule } from './doctor'
import { PatientService } from '../services/patient';

export class SalaryModule {
    static perPatientBonus: number = 2500;

    public static async calculateSalary (doctorId: string): Promise<number> {
        const baseSalary = await DoctorModule.getBaseSalary(doctorId);
        const numberOfPatients = await PatientService.getNumberOfPatients(doctorId);
        return baseSalary + numberOfPatients * SalaryModule.perPatientBonus;
    }
}