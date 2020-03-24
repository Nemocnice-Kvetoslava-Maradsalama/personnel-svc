const port = 8701;
const host = '0.0.0.0';

export const corsOptions = {
    origin: `http://${host}:${port}`
};

export default {
    port,
    host,
};