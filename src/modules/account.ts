import { Account as model } from '../models';

export class AccountModule {

    public static async getAllAccounts (): Promise<any> {
        return model.findAll();
    }

    public static async getAccountById (doctorId: string): Promise<any> {
        return model.findByPk(doctorId);
    }

    public static async addAccount (username: string, password: string, salt: string, email: string): Promise<any> {
        return model.create({
            username,
            password,
            password_salt: salt,
            email,
            last_login: null
        });
    }

    public static async updateAccountById (id: string, username: string, password: string, salt: string, email: string): Promise<any> {
        return model.update({
            username,
            password,
            password_salt: salt,
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