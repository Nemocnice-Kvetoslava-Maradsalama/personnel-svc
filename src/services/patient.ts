import { injectable, inject } from "inversify";
import { RequestService } from './request';
import { EurekaService } from './eureka';

@injectable()
export class PatientService {
    private appId: string = 'PATIENT-SVC';

    constructor (@inject(RequestService) private requestService: RequestService, @inject(EurekaService) private eurekaService: EurekaService) {}

    public async getNumberOfPatients (doctorId: string, authorizationHeader: string): Promise<number> {
        let url = this.eurekaService.getServiceInstanceUrl(this.appId);
        url += 'interaction/doctorInteractionCount?doctorId=' + doctorId;

        const response = await this.requestService.get(url, authorizationHeader);
        const json = await response.json();
        return json;
    }
}