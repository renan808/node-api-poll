import type { AccountModel, AddAccount, Hasher, AddAccountModel, AddAccountRepository, LoadAccountByEmailRepository } from './db-add-account-protocols'
export class DbAddAccount implements AddAccount {
    constructor (private readonly hasher: Hasher, private readonly addAccountRepository: AddAccountRepository,
        private readonly LoadAccountByEmailRepository: LoadAccountByEmailRepository) {
    }

     async add (accountData: AddAccountModel): Promise<AccountModel> {
        const account = await this.LoadAccountByEmailRepository.loadByEmail(accountData.email)
        if (account) {
            // eslint-disable-next-line prefer-promise-reject-errors
            return await new Promise((resolve, reject) => reject(new Error('Email already exists.')))
        }
        const hashedPass = await this.hasher.hash(accountData.password)
        const newAccount = await this.addAccountRepository.add(Object.assign({}, accountData, { password: hashedPass }))
        return newAccount
    }
}
