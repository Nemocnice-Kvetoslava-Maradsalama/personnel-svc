'use strict';

import { Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { Client } from 'pg';
import { Sequelize, DataTypes } from 'sequelize';
import config, { corsOptions } from './config/server';
import dbconfig from './config/db';

import * as express from 'express';

const server = express();

server.use(cors(corsOptions));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

const sequelize = new Sequelize(dbconfig.database, dbconfig.user, dbconfig.password, {
    host: dbconfig.host,
    dialect: dbconfig.dialect,
    pool: {
        max: dbconfig.pool.max,
        min: dbconfig.pool.min,
        acquire: dbconfig.pool.acquire,
        idle: dbconfig.pool.idle
    }
});

const Account = sequelize.define('Account', {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password_salt: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    created_on: {
        type: DataTypes.DATE,
        allowNull: false
    },
    last_login: {
        type: DataTypes.DATE,
        allowNull: false
    },
}, {});

const Doctor = sequelize.define('Doctor', {
    firstname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    created_on: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {});

const Nurse = sequelize.define('Nurse', {
    firstname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    created_on: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {});

sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
});

server.get('/', async (req: Request, res: Response) => {

    //database
    const client = new Client()
    await client.connect()
    const result = await client.query('SELECT name as one from test');
    console.log(result.rows[0].one);
    await client.end()

    res.json({ message: 'Hello World: ' + result.rows[0].one });
    //res.send('Hello World: ' + result.rows[0].one);
});


server.listen(config.port, config.host, () => {
    console.log(`Server up on http://${config.host}:${config.port}`);
});