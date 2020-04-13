import { AccountModule } from './account';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

const SECRET_KEY = "secretkey1234";

export class AuthenticationModule {
    
    public static async login (username: string, password: string): Promise<any> {
        const account = await AccountModule.getAccountByUsername(username);
        const isValid = await bcrypt.compare(password, account[0].password);
        if (!isValid) {
            throw 'invalid password';
        }
        const expiresIn = 24 * 60 * 60;
        const accessToken = jwt.sign({ id: account[0].id }, SECRET_KEY, { expiresIn });
        return { "access_token": accessToken, "expires_in":  expiresIn };
    }

    public static async validateToken (token: string): Promise<boolean> {
        try {
            jwt.verify(token, SECRET_KEY);
            return true;
        } catch (error) {
            return false;
        }
    }

}