import request from 'supertest'
import app from '../config/app'
import { Mongohelper } from '../../infra/db/mongo-db/helpers/mongo-helper'
import type { Collection } from 'mongodb'
import { sign } from 'jsonwebtoken'
import env from '../config/env'

const makeFakeAccount = (): any => ({
    name: 'name_test',
    email: 'emailtest@email.com',
    password: 'testpassword',
    role: 'admin'
})

describe('Survey routes', () => {
    let SurveyCollection: Collection
    let AccountCollection: Collection
    beforeAll(async () => {
        await Mongohelper.connect(global.__MONGO_URI__)
    })
    afterAll(async () => {
        await Mongohelper.disconnect()
    })

    beforeEach(async () => {
        SurveyCollection = await Mongohelper.getCollection('surveys')
        await SurveyCollection.deleteMany({})
        AccountCollection = await Mongohelper.getCollection('accounts')
    })
    describe('POST /surveys', () => {
        test('Should return 403 if AddSurveys was called without acessToken', async () => {
            await request(app)
            .post('/api/surveys')
            .send({
                question: 'some_question',
                answers: [{
                    answer1: 'response1',
                    image1: 'image1'
                }, {
                    answer2: 'response2',
                    image: 'image2'
                }]
            })
            .expect(403)
        })

        test('Should return 200 if AddSurveys was called with acessToken', async () => {
            const response = await AccountCollection.insertOne(makeFakeAccount())
            const acessToken = sign({ id: response.insertedId }, env.jwtSecret)
            await AccountCollection.updateOne({
                _id: response.insertedId
            }, {
                $set: {
                    acessToken
                }
            })
            await request(app)
            .post('/api/surveys')
            .set('x-acess-token', acessToken)
            .send({
                question: 'some_question',
                answers: [{
                    answer1: 'response1',
                    image1: 'image1'
                }, {
                    answer2: 'response2',
                    image: 'image2'
                }]
            })
            .expect(200)
        })
    describe('GET /surveys', () => {
        test('Should return 204 if LoadSurveys was called with acessToken', async () => {
            const response = await AccountCollection.insertOne(makeFakeAccount())
            const acessToken = sign({ id: response.insertedId }, env.jwtSecret)
            await AccountCollection.updateOne({
                _id: response.insertedId
            }, {
                $set: {
                    acessToken
                }
            })
            await request(app)
            .get('/api/surveys')
            .set('x-acess-token', acessToken)
            .send({
            })
            .expect(204)
        })

        test('Should return 403 if LoadSurveys was called without acessToken', async () => {
            await request(app)
            .get('/api/surveys')
            .send({
            })
            .expect(403)
        })
    })
    })
})
