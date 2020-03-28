import { Sequelize } from 'sequelize';
import dbconfig from '../config/db';
import buildAccount from './Account';
import buildDoctor from './Doctor';
import buildNurse from './Nurse';

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

const Account = buildAccount(sequelize);
const Doctor = buildDoctor(sequelize);
const Nurse = buildNurse(sequelize);

sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
});

export { Account, Doctor, Nurse };