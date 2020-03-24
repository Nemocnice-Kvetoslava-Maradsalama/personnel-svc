export default {
    host: 'postgres_container',
    user: 'dbuser',
    password: 'secretpassword',
    database: 'mydb',
    dialect: 'postgres' as 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
