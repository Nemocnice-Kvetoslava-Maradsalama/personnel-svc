import { injectable } from "inversify";

@injectable()
export class PatientService {

    public async getNumberOfPatients (doctorId: string): Promise<number> {
        return Promise.resolve(15);
    }
    
}