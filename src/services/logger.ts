import { injectable, inject } from "inversify";
import { TYPES, LOGLEVEL, Config } from '../types';

@injectable()
export class LoggerService {

    constructor (@inject(TYPES.Config) private config: Config) {}

    public log (value: string) {
        if (this.config.logLevel == LOGLEVEL.DEBUG) {
            console.log(value);
        }
    }

    public warn (value: string) {
        if (this.config.logLevel == LOGLEVEL.DEBUG || this.config.logLevel == LOGLEVEL.ERROR) {
            console.warn(value);
        }
    }

    public error (value: string) {
        if (this.config.logLevel == LOGLEVEL.DEBUG || this.config.logLevel == LOGLEVEL.ERROR) {
            console.error(value);
        }
    }
}