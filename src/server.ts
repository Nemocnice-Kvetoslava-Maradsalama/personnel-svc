'use strict';

import { Request, Response } from 'express';
import { Client } from 'pg';
import config from './config';

const express = require('express');

const server = express();
server.get('/', async (req: Request, res: Response) => {
    const text = await Promise.resolve('asdf')
    
    //database
    const client = new Client()
    await client.connect()
    const result = await client.query('SELECT 1 as one');
    console.log(result.rows[0].one);
    await client.end()

    res.send('Hello World: ' + result.rows[0].one);
});


server.listen(config.port, config.host);

console.log(`Server up on http://${config.host}:${config.port}`);