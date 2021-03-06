import { Account, Doctor } from './define/types';

export const accounts: Account[] = [{
    username: 'testuser',
    password: '$2a$10$N7GIliFM/l2n0sztUFdSsOYLKVhpUgnC8z69eERhB65NjDC6vhffS', //'testpassword',
    email: 'test@email.com',
    DoctorId: 1
}, {
    username: 'testuser2',
    password: '$2a$10$N7GIliFM/l2n0sztUFdSsOYLKVhpUgnC8z69eERhB65NjDC6vhffS', //'testpassword',
    email: 'test2@email.com',
    DoctorId: 2
}, {
    username: 'testuser3',
    password: '$2a$10$N7GIliFM/l2n0sztUFdSsOYLKVhpUgnC8z69eERhB65NjDC6vhffS', //'testpassword',
    email: 'test3@email.com'
}];

export const doctors: Doctor[] = [{
    firstname: 'doctorname',
    lastname: 'doctorlastname',
    salary: 55000,
    drugLevel: 1
}, {
    firstname: 'doctorname',
    lastname: 'doctorlastname',
    salary: 55000,
    drugLevel: 3
}];