import { injectable, inject } from "inversify";

import { DoctorModel } from '../models/doctor'
import { PatientService } from '../services/patient';

@injectable()
export class SalaryModule {
    private perPatientBonus: number = 2500;

    constructor (@inject(DoctorModel) private doctor: DoctorModel, @inject(PatientService) private patientService: PatientService) {}

    public async calculateSalary (doctorId: string): Promise<number> {
        const baseSalary = await this.doctor.getBaseSalary(doctorId);
        const numberOfPatients = await this.patientService.getNumberOfPatients(doctorId);
        return baseSalary + numberOfPatients * this.perPatientBonus;
    }
}