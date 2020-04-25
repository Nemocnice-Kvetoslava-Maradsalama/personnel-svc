import { injectable, inject } from 'inversify';
import { SequelizeModel } from './types';
import { Account, TYPES } from './define/types';
import { LoggerService } from '../services/logger';

@injectable()
export class AccountModel {

    constructor (@inject(TYPES.AccountSequelizeModel) private model: SequelizeModel<Account>, @inject(LoggerService) private loggerService: LoggerService) {}

    public async getAllAccounts (): Promise<any> {
        return this.model.findAll();
    }

    public async getAccountById (accountId: string): Promise<Account> {
        return this.model.findByPk(accountId);
    }

    public async getAccountByUsername (username: string): Promise<Account | null> {
        const result = await this.model.findAll({
            where: { username }
        });
        if (result && result.length) {
            return result[0];
        } else {
            this.loggerService.warn('AccountModel/getAccountByUsername - username does not exist');
            return null;
        }
    }

    public async addAccount (username: string, password: string, email: string): Promise<Account> {
        return this.model.create({
            username,
            password,
            email
        });
    }

    public async updateAccountById (id: string, username: string, password: string, email: string): Promise<Account> {
        return this.model.update({
            username,
            password,
            email,
        }, {
            where: { id }
        });
    }

    public async deleteAccount (id: string): Promise<number> {
        return this.model.destroy({
            where: { id }
        });
    }

}