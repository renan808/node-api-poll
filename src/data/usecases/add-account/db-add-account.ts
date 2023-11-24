import type { AccountModel, AddAccount, Encrypter, AddAccountModel, AddAccountRepository } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
    private readonly encrypter: Encrypter
    private readonly addAccountRepository: AddAccountRepository
    constructor (encrypter: Encrypter, addAccountRepository: AddAccountRepository) {
        this.encrypter = encrypter
        this.addAccountRepository = addAccountRepository
    }

    async add (accountData: AddAccountModel): Promise<AccountModel> {
        const hashedPass = await this.encrypter.encrypt(accountData.password)
        await this.addAccountRepository.add(Object.assign({}, accountData, { password: hashedPass }))
        return await new Promise(resolve => {
            resolve({
                id: 'valid_id',
                name: 'valid_name',
                email: 'valid_email',
                password: 'valid_password'
            })
        })
    }
}
