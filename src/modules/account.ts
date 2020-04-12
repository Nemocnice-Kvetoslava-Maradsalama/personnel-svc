import { Account as model } from '../models';

export class AccountModule {

    public static async getAllAccounts (): Promise<any> {
        return model.findAll();
    }

    public static async getAccountById (accountId: string): Promise<any> {
        return model.findByPk(accountId);
    }

    public static async getAccountByUsername (username: string): Promise<any> {
        return model.findAll({
            where: { username }
        });
    }

    public static async addAccount (username: string, password: string, email: string): Promise<any> {
        return model.create({
            username,
            password,
            email,
            last_login: null
        });
    }

    public static async updateAccountById (id: string, username: string, password: string, email: string): Promise<any> {
        return model.update({
            username,
            password,
            email,
        }, {
            where: { id }
        });
    }

    public static async deleteAccount (id: string): Promise<void> {
        return model.destroy({
            where: { id }
        });
    }

}