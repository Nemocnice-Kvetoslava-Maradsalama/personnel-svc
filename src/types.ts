import { DecodeOptions, Secret, SignOptions, VerifyOptions } from 'jsonwebtoken';
import { Response, RequestInfo, RequestInit } from 'node-fetch';

export interface Bcrypt {
    compare (value: string, compareWith: string): Promise<boolean>;
}

export type Fetch = (url: RequestInfo, init?: RequestInit) => Promise<Response>;

export interface Jwt {
    decode (token: string, options?: DecodeOptions): null | { [key: string]: any } | string;
    sign (payload: string | Buffer | object, secretOrPrivateKey: Secret, options?: SignOptions ): string;
    verify (token: string, secretOrPublicKey: Secret, options?: VerifyOptions): object | string;
}

const TYPES = {
    Bcrypt: Symbol.for('Bcrypt'),
    Fetch: Symbol.for('Fetch'),
    Jwt: Symbol.for('Jwt'),
    Eureka: Symbol.for('Eureka')
};

export { TYPES };