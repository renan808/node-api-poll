import request from 'supertest'
import app from '../config/app'
import { Mongohelper } from '../../infra/db/mongo-db/helpers/mongo-helper'
import type { Collection } from 'mongodb'
import { sign } from 'jsonwebtoken'
import env from '../config/env'
import { mockAccountModel, mockSurveyModel } from '@/domain/test'

describe('Survey-result routes', () => {
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
        await AccountCollection.deleteMany({})
    })
    describe('PUT /surveys/:surveyId/results', () => {
        test('Should return 403 if save-survey-result was called without acessToken', async () => {
            const survey = await SurveyCollection.insertOne(mockSurveyModel())
            await request(app)
            .put(`/api/surveys/${survey.insertedId.toString()}/results`)
            .send({
                answer: 'any_answer'
            })
            .expect(403)
        })

        test('Should return 200 if save-survey-result was called with acessToken', async () => {
            const survey = await SurveyCollection.insertOne(mockSurveyModel())
            const res = await AccountCollection.insertOne(mockAccountModel())
            const acessToken = sign({ id: res.insertedId }, env.jwtSecret)
            await AccountCollection.updateOne({
                _id: res.insertedId
            }, {
                $set: {
                    acessToken
                }
            })
            await request(app)
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            .put(`/api/surveys/${survey.insertedId.toString()}/results`)
            .set('x-acess-token', acessToken)
            .send({
                answer: 'any_answer'
            })
            .expect(200)
        })
    })
})
