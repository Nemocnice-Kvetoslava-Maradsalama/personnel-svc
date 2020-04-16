import { injectable, inject } from "inversify";
import { RequestService } from './request';
import { EurekaService } from './eureka';

@injectable()
export class PatientService {
    private appId: string = 'PATIENT-SVC';

    constructor (@inject(RequestService) private requestService: RequestService, @inject(EurekaService) private eurekaService: EurekaService) {}

    public async getNumberOfPatients (doctorId: string): Promise<number> {
        let url = this.eurekaService.getServiceInstanceUrl(this.appId);
        url += 'interaction/doctorInteractionCount?doctorId=' + doctorId;

        const response = await this.requestService.get(url);
        const json = await response.json();
        return json;
    }

    /*
    public async getNumberOfPatients (doctorId: string): Promise<number> {
        let url = 'http://172.20.0.4:8080/';//this.eurekaService.getServiceInstanceUrl(this.appId);
        url += 'patient/list'
        console.log('!!!!service url: ', url);
        const response = await this.requestService.get(url);
        const json = await response.json();
        console.log('!!!!result body', response);
        console.log('!!!!result body', json);
        console.log('!!!!result body', json[0].firstName);
        return 0;
    }
    */
}