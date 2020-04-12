export class PatientService {

    public static async getNumberOfPatients (doctorId: string): Promise<number> {
        return Promise.resolve(15);
    }
    
}