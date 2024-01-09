import { Mongohelper } from '../../../infra/db/mongo-db/helpers/mongo-helper'
import type { Collection } from 'mongodb'
import { ExistInDB } from './exist-in-db-validation'
import { InvalidParamError } from '../../errors'
const makeSut = (): ExistInDB => {
    return new ExistInDB()
}

describe('ExistInDB Validation', () => {
    let accountCollection: Collection
    beforeAll(async () => {
        await Mongohelper.connect(global.__MONGO_URI__)
    })
    afterAll(async () => {
        await Mongohelper.disconnect()
    })

    beforeEach(async () => {
        accountCollection = await Mongohelper.getCollection('accounts')
        await accountCollection.deleteMany({})
    })
    test('Should return an Error if an Account exist in db', async () => {
        const sut = makeSut()
        await accountCollection.insertOne({
            name: 'fakeacc',
            email: 'fakeEmail@gmail.com',
            password: 'fakepass123'
        })
        const error = await sut.validate({ email: 'fakeEmail@gmail.com' })
        expect(error).toEqual(new InvalidParamError('Email already exists'))
    })
})
