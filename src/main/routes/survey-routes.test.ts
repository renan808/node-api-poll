import request from 'supertest'
import app from '../config/app'
import { Mongohelper } from '../../infra/db/mongo-db/helpers/mongo-helper'
import type { Collection } from 'mongodb'

describe('Survey routes', () => {
    let SurveyCollection: Collection
    beforeAll(async () => {
        await Mongohelper.connect(global.__MONGO_URI__)
    })
    afterAll(async () => {
        await Mongohelper.disconnect()
    })

    beforeEach(async () => {
        SurveyCollection = await Mongohelper.getCollection('surveys')
        await SurveyCollection.deleteMany({})
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

        test('Should return 403 if LoadSurveys was called without acessToken', async () => {
            await request(app)
            .get('/api/surveys')
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
    })
})
