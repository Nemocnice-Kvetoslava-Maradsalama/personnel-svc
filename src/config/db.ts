import * as env from 'env-var';

export default {
    host: env.get('PGHOST').default('postgres_container').asString(),
    user: env.get('PGUSER').default('dbuser').asString(),
    password: env.get('PGPASSWORD').default('secretpassword').asString(),
    database: env.get('PGDATABASE').default('mydb').asString(),
    dialect: 'postgres' as 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
