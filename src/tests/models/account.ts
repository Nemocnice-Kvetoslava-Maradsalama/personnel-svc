import 'reflect-metadata';
import { expect } from 'chai';
import * as sinon from 'sinon';
import { AccountModel } from '../../models/account';

describe('AccountModel', () => {
    let instance: AccountModel, model, logger;
    beforeEach(() => {
        model = {
            findAll: sinon.stub(),
            findByPk: sinon.stub(),
            create: sinon.stub(),
            update: sinon.stub(),
            destroy: sinon.stub()
        };
        logger = {
            log: sinon.stub(),
            warn: sinon.stub(),
            error: sinon.stub(),
        };
        instance = new AccountModel(model, logger);
    });
    describe('getAllAccounts', () => {
        it('', async () => {
            const allAccounts = Symbol('all accounts');
            model.findAll.returns(allAccounts);
            const result = await instance.getAllAccounts();
            expect(result).to.equal(allAccounts);
        });
    });
    describe('getAccountById', () => {
        it('', async () => {
            const account = Symbol('account');
            model.findByPk.returns(account);
            const accountId = 'accountId';
            const result = await instance.getAccountById(accountId);
            expect(result).to.equal(account);
            expect(model.findByPk.calledWith(accountId)).to.be.true;
        });
    });
    describe('getAccountByUsername', () => {
        it('has account with username', async () => {
            const username = 'username';
            const account = Symbol('account');
            const mockResult = [account];
            model.findAll.returns(mockResult);
            const result = await instance.getAccountByUsername(username);
            expect(result).to.equal(account);
            expect(model.findAll.calledWith({ where: { username }})).to.be.true;
        });
        it('no account with username', async () => {
            const username = 'username';
            const mockResult = undefined;
            model.findAll.returns(mockResult);
            const result = await instance.getAccountByUsername(username);
            expect(result).to.be.null;
            expect(model.findAll.calledWith({ where: { username }})).to.be.true;
        });
    });
    describe('addAccount', () => {
        it('', async () => {
            const account = {
                field: 'value'
            };
            model.create.returns(account);
            const username = 'user1';
            const password = 'pawd1';
            const email = 'email@test.cz';
            const result = await instance.addAccount(username, password, email);
            expect(result).to.equal(account);
            expect(model.create.calledWith({ username, password, email })).to.be.true;
        });
    });
    describe('updateAccountById', () => {
        it('', async () => {
            const account = {
                field: 'value'
            };
            model.update.returns(account);
            const id = 'idone';
            const username = 'someuser';
            const password = 'pawedd';
            const email = 'some@email.cz';
            const result = await instance.updateAccountById(id, username, password, email);
            expect(result).to.equal(account);
            expect(model.update.calledWith({ username, password, email }, { where: { id } })).to.be.true;
        });
    });
    describe('deleteAccount', () => {
        it('', async () => {
            const destroyed = 1;
            model.destroy.returns(destroyed);
            const id = 'someid';
            const result = await instance.deleteAccount(id);
            expect(result).to.equal(destroyed);
            expect(model.destroy.calledWith({ where: { id } })).to.be.true;
        });
    });
});
