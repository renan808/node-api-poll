import type { Validation } from './validation'
import { Mongohelper } from '../../../infra/db/mongo-db/helpers/mongo-helper'
export class ExistInDB implements Validation {
     async validate (input: any): Promise<any> {
        const accountCollection = await Mongohelper.getCollection('accounts')
        const account = await accountCollection.findOne({ email: input.email })
        if (account) {
            return await new Promise((resolve, reject) => {
                reject(new Error('Email already exists'))
            })
        }
    }
}
