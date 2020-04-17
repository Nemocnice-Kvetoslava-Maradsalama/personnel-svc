export interface Account {
    id?: string;
    username: string;
    password: string;
    email: string;
    last_login?: Date;
    DoctorId?: number;
}

export interface Doctor {
    firstname: string;
    lastname: string;
    salary: number;
}

const TYPES = {
    AccountSequelizeModel: Symbol.for('AccountSequelizeModel'),
    DoctorSequelizeModel: Symbol.for('DoctorSequelizeModel')
};

export { TYPES };