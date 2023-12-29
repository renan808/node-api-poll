import request from 'supertest'
import app from '../config/app'
import { Mongohelper } from '../../infra/db/mongo-db/helpers/mongo-helper'
import type { Collection } from 'mongodb'
import { hash } from 'bcrypt'
describe('Login routes', () => {
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

    describe('POST /login', () => {
        test('Should return 200 on login', async () => {
            const password = await hash('123', 12)
            await accountCollection.insertOne({
                name: 'renan',
                email: 'renan@gmail.com',
                password
            })
            await request(app)
            .post('/api/login')
            .send({
                email: 'renan@gmail.com',
                password: '123'
            })
            .expect(200)
        })
    })
})
