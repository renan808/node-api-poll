import type { AddAccountRepository } from '../../../../data/protocols/db/add-account-repository'
import type { AddAccountModel } from '../../../../domain/use-cases/add-account'
import type { AccountModel } from '../../../../domain/models/account'
import { Mongohelper } from '../helpers/mongo-helper'
export class AccountMongoRepository implements AddAccountRepository {
    async add (accountData: AddAccountModel): Promise<AccountModel> {
        const accountCollection = await Mongohelper.getCollection('accounts')
        const result = await accountCollection.insertOne(accountData)
        const account = await accountCollection.findOne({ _id: result.insertedId })
        return Mongohelper.map(account)
    }
}
