import * as env from 'env-var';
import { LOGLEVEL } from '../types';

const port = env.get('SERVER_PORT').default(8701).asPortNumber();
const host = '0.0.0.0';
const logLevel = env.get('LOGLEVEL').default(LOGLEVEL.DEBUG).asInt();

export const corsOptions = {
    origin: '*'//'`http://${host}:${port}`
};

export default {
    port,
    host,
    logLevel,
};