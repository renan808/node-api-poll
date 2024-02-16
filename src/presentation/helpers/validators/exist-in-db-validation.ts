import type { Validation } from './validation'
import { Mongohelper } from '../../../infra/db/mongo-db/helpers/mongo-helper'
import { InvalidParamError } from '../../errors'
export class ExistInDB implements Validation {
     async validate (input: any): Promise<any> {
        const accountCollection = await Mongohelper.getCollection('accounts')
        const account = await accountCollection.findOne({ email: input.email })
        if (account) {
            return new InvalidParamError('Email already exists')
        }
    }
}
