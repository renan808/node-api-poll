import request from 'supertest'
import app from '../config/app'
import { Mongohelper } from '../../infra/db/mongo-db/helpers/mongo-helper'

describe('Login routes', () => {
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
    describe('POST /signup', () => {
        test('Should return an 200 on signup', async () => {
            await request(app)
            .post('/api/signup')
            .send({
                name: 'renan',
                email: 'renan@gmail.com',
                password: '123',
                password_confirm: '123'
            })
            .expect(200)
        })
    })
})
