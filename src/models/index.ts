import { Sequelize, Model } from 'sequelize';
import dbconfig from '../config/db';
import defineAccount from './define/Account';
import defineDoctor from './define/Doctor';
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

const Account: any = defineAccount(sequelize);
const Doctor: any = defineDoctor(sequelize);
Account.belongsTo(Doctor);

sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
    const promises = doctors.map((doctor) => Doctor.create(doctor));
    Promise.all(promises).then(() => {
        accounts.forEach((account) => Account.create(account));
    });
});

export { Account, Doctor };