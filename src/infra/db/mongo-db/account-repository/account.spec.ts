import { Mongohelper } from '../helpers/mongo-helper'
import { AccountMongoRepository } from './account'
describe('Account Mongo Repository', () => {
    beforeAll(async () => {
        await Mongohelper.connect(global.__MONGO_URI__)
    })
    afterAll(async () => {
        await Mongohelper.disconnect()
    })

    beforeEach(async () => {
        const accountCollection = await Mongohelper.getCollection('accounts')
        await accountCollection.deleteMany({})
    })

    const makeSut = (): AccountMongoRepository => {
        return new AccountMongoRepository()
    }
    test('Should return an account on success', async () => {
        const sut = makeSut()
        const account = await sut.add({
            name: 'any_name',
            email: 'any_email@email.com',
            password: 'any_password'
        })
        expect(account).toBeTruthy()
        expect(account.id).toBeTruthy()
        expect(account.name).toBe('any_name')
        expect(account.email).toBe('any_email@email.com')
        expect(account.password).toBe('any_password')
    })
})