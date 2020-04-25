import * as env from 'env-var';

const port = env.get('SERVER_PORT').default(8701).asPortNumber();
const host = env.get('SERVER_IP').default('0.0.0.0').asString();

export const corsOptions = {
    origin: `http://${host}:${port}`
};

export default {
    port,
    host,
};