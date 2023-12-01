import type { AddAccountRepository } from '../../../../data/protocols/add-account-repository'
import type { AddAccountModel } from '../../../../domain/use-cases/add-account'
import type { AccountModel } from '../../../../domain/models/account'
import { Mongohelper } from '../helpers/mongo-helper'
export class AccountMongoRepository implements AddAccountRepository {
    async add (accountData: AddAccountModel): Promise<AccountModel> {
        const accountCollection = await Mongohelper.getCollection('accounts')
        await accountCollection.insertOne(accountData)
        const account = await accountCollection.findOne({ name: accountData.name })
        let accountWithoutId
        if (account) {
            accountWithoutId = {
                id: account._id.toString(),
                name: account.name,
                email: account.email,
                password: account.password
            }
        }
        return accountWithoutId
    }
}
