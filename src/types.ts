import { Secret, SignOptions, VerifyOptions } from 'jsonwebtoken';

export interface Bcrypt {
    compare (value: string, compareWith: string): Promise<boolean>;
}

export interface Jwt {
    sign (payload: string | Buffer | object, secretOrPrivateKey: Secret, options?: SignOptions ): string;
    verify (token: string, secretOrPublicKey: Secret, options?: VerifyOptions): object | string
}

const TYPES = {
    Bcrypt: Symbol.for('Bcrypt'),
    Jwt: Symbol.for('Jwt')
};

export { TYPES };