import type { Collection } from 'mongodb'
import { Mongohelper } from '../helpers/mongo-helper'
import { AccountMongoRepository } from './account-mongo-repository'
describe('Account Mongo Repository', () => {
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

    const makeSut = (): AccountMongoRepository => {
        return new AccountMongoRepository()
    }
    test('Should return an account on add success', async () => {
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

    test('Should return an account on loadByEmail success', async () => {
        await accountCollection.insertOne({
            name: 'any_name',
            email: 'any_email@email.com',
            password: 'any_password'
        })
        const sut = makeSut()
        const account = await sut.loadByEmail('any_email@email.com')
        expect(account).toBeTruthy()
        expect(account.id).toBeTruthy()
        expect(account.name).toBe('any_name')
        expect(account.email).toBe('any_email@email.com')
        expect(account.password).toBe('any_password')
    })

    test('Should return null if loadByEmail fails', async () => {
        const sut = makeSut()
        const account = await sut.loadByEmail('any_email@email.com')
        expect(account).toBeFalsy()
    })

    test('Should update account Acess token if UpdateAcesToken succeeds', async () => {
        const sut = makeSut()
        const fakeAccountAdded = await accountCollection.insertOne({
            name: 'any_name',
            email: 'any_email@email.com',
            password: 'any_password'
        })
        const account = await accountCollection.findOne({ _id: fakeAccountAdded.insertedId })
        if (account) {
            expect(account).toBeTruthy()
            expect(account.acessToken).toBeFalsy()
            await sut.updateToken(account._id, 'any_token')
        }
        const accountWithToken = await accountCollection.findOne({ _id: fakeAccountAdded.insertedId })
        if (accountWithToken) {
            expect(accountWithToken._id).toBeTruthy()
            expect(accountWithToken.name).toBe('any_name')
            expect(accountWithToken.email).toBe('any_email@email.com')
            expect(accountWithToken.password).toBe('any_password')
            expect(accountWithToken.acessToken).toBe('any_token')
        }
    })
})
