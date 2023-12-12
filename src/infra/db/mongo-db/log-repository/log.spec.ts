import type { Collection } from 'mongodb'
import { Mongohelper } from '../helpers/mongo-helper'
import { LogMongoRepository } from './log'
describe('Log Mongo Repository', () => {
    let errorCollection: Collection
    beforeAll(async () => {
        await Mongohelper.connect(global.__MONGO_URI__)
    })
    afterAll(async () => {
        await Mongohelper.disconnect()
    })

    beforeEach(async () => {
        errorCollection = await Mongohelper.getCollection('errors')
        await errorCollection.deleteMany({})
    })

    test('Should create an error log on success', async () => {
        const sut = new LogMongoRepository()
        await sut.logError('any_error')
        const count = await errorCollection.countDocuments()
        expect(count).toBe(1)
    })
})
