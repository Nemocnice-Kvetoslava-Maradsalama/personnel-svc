import { injectable, inject } from "inversify";

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
        const isValid = await this.bcrypt.compare(password, account.password);
        if (!isValid) {
            throw 'invalid password';
        }
        const expiresIn = 24 * 60 * 60;
        const accessToken = this.jwt.sign({ id: account.id }, SECRET_KEY, { expiresIn });
        return { "access_token": accessToken, "expires_in":  expiresIn };
    }

    public async validate (authorizationHeader: string | undefined): Promise<boolean> {
        if (!authorizationHeader) {
            return false;
        }
        const token = this.getTokenFromAuthorizationHeader(authorizationHeader);
        if (token) {
            return this.validateToken(token);
        } else {
            return false;
        }
    }

    public async validateDoctor (authorizationHeader: string | undefined): Promise<boolean> {
        if (!authorizationHeader) {
            return false;
        }
        const token = this.getTokenFromAuthorizationHeader(authorizationHeader);
        if (token && this.validateToken(token)) {
            const decoded = this.jwt.decode(token);
            if (decoded) {
                const accountId = decoded['id'];
                const account = await this.account.getAccountById(accountId);
                return account.DoctorId !== null;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    private getTokenFromAuthorizationHeader (authorizationHeader: string): string | null {
        const match = authorizationHeader.match(/Bearer (.*)/);
        if (match && match.length > 0) {
            return match[1];
        } else {
            return null;
        }
    }

    private async validateToken (token: string): Promise<boolean> {
        try {
            this.jwt.verify(token, SECRET_KEY);
            return true;
        } catch (error) {
            return false;
        }
    }

};