import { Sequelize } from 'sequelize';
import dbconfig from '../config/db';
import buildAccount from './Account';
import buildDoctor from './Doctor';
import { accounts, doctors } from './initialData';

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

const Account: any = buildAccount(sequelize);
const Doctor: any = buildDoctor(sequelize);

sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
    accounts.forEach((account) => Account.create(account));
    doctors.forEach((doctor) => Doctor.create(doctor));
});

export { Account, Doctor };