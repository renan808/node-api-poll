import type { AddAccountRepository } from '../../../../data/protocols/db/add-account-repository'
import type { AddAccountModel } from '../../../../domain/use-cases/add-account'
import type { AccountModel } from '../../../../domain/models/account'
import { Mongohelper } from '../helpers/mongo-helper'
import type { LoadAccountByEmailRepository } from '../../../../data/protocols/db/LoadAccountByEmailRepository'
import type { UpdateAcessTokenRepository } from '../../../../data/protocols/db/updateAcessTokenRepository'
export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository, UpdateAcessTokenRepository {
    async add (accountData: AddAccountModel): Promise<AccountModel> {
        const accountCollection = await Mongohelper.getCollection('accounts')
        const result = await accountCollection.insertOne(accountData)
        const account = await accountCollection.findOne({ _id: result.insertedId })
        return Mongohelper.map(account)
    }

    async loadByEmail (email: string): Promise<AccountModel> {
        const accountCollection = await Mongohelper.getCollection('accounts')
        const account = await accountCollection.findOne({ email })
        return Mongohelper.map(account)
    }

    async updateToken (id: string, token: string): Promise<void> {
        const accountCollection = await Mongohelper.getCollection('accounts')
        await accountCollection.updateOne({ id }, { acessToken: 'any_token' })
    }
}
