import { injectable } from "inversify";
import "reflect-metadata";

@injectable()
export class PatientService {

    public async getNumberOfPatients (doctorId: string): Promise<number> {
        return Promise.resolve(15);
    }
    
}