import { injectable, inject } from "inversify";
import "reflect-metadata";

import { AccountModel } from '../models/account';
import { Bcrypt, TYPES, Jwt } from '../types';

const SECRET_KEY = "secretkey1234";

@injectable()
export class AuthenticationModule {

    constructor (@inject(TYPES.Bcrypt) private bcrypt: Bcrypt, @inject(TYPES.Jwt) private jwt: Jwt, @inject(AccountModel) private account: AccountModel) {}
    
    public async login (username: string, password: string): Promise<any> {
        const account = await this.account.getAccountByUsername(username);
        if (!account) {
            throw 'no record';
        }
        const isValid = await this.bcrypt.compare(password, account[0].password);
        if (!isValid) {
            throw 'invalid password';
        }
        const expiresIn = 24 * 60 * 60;
        const accessToken = this.jwt.sign({ id: account[0].id }, SECRET_KEY, { expiresIn });
        return { "access_token": accessToken, "expires_in":  expiresIn };
    }

    public async validateToken (token: string): Promise<boolean> {
        try {
            this.jwt.verify(token, SECRET_KEY);
            return true;
        } catch (error) {
            return false;
        }
    }

};