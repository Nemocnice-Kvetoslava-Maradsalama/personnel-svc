import * as swaggerUi from 'swagger-ui-express';
import * as express from "express";
import * as swaggerDocument from '../swagger.json';

export default (server: express.Application) => {
    server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
