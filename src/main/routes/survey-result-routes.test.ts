import request from 'supertest'
import app from '../config/app'
import { Mongohelper } from '../../infra/db/mongo-db/helpers/mongo-helper'
import { type Collection } from 'mongodb'
import { sign } from 'jsonwebtoken'
import env from '../config/env'
import { mockAccountModel } from '@/domain/test'
import type { SurveyModel } from '@/domain/models/survey'

describe('Survey-result routes', () => {
    let surveyCollection: Collection
    let accountCollection: Collection
    let surveyResultsCollection: Collection
    const mockSurveyModel = async (): Promise<SurveyModel> => {
        const idSurvey = await surveyCollection.insertOne({
            quesiton: 'any_question',
            answers: [{
                image: 'any_image',
                answer: 'any_answer'
            }, {
                image: 'other_image',
                answer: 'other_answer'
            }, {
                image: 'image3',
                answer: 'answer3'
            }, {
                image: 'image4',
                answer: 'answer5'
            }]
        })
        const survey = await surveyCollection.findOne({ _id: idSurvey.insertedId })
        return Mongohelper.map(survey)
}
    beforeAll(async () => {
        await Mongohelper.connect(global.__MONGO_URI__)
    })
    afterAll(async () => {
        await Mongohelper.disconnect()
    })

    beforeEach(async () => {
        surveyResultsCollection = await Mongohelper.getCollection('surveyResults')
        surveyCollection = await Mongohelper.getCollection('surveys')
        await surveyCollection.deleteMany({})
        accountCollection = await Mongohelper.getCollection('accounts')
        await accountCollection.deleteMany({})
    })
    describe('PUT /surveys/:surveyId/results', () => {
        test('Should return 403 if SaveSurveyResult was called without acessToken', async () => {
            const survey = await mockSurveyModel()
            await request(app)
            .put(`/api/surveys/${survey.id.toString()}/results`)
            .send({
                answer: 'any_answer'
            })
            .expect(403)
        })

        test('Should return 200 if SaveSurveyResult was called with acessToken', async () => {
            const survey = await mockSurveyModel()
            const res = await accountCollection.insertOne(mockAccountModel())
            const acessToken = sign({ id: res.insertedId }, env.jwtSecret)
            await accountCollection.updateOne({
                _id: res.insertedId
            }, {
                $set: {
                    acessToken
                }
            })
            await request(app)
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            .put(`/api/surveys/${survey.id.toString()}/results`)
            .set('x-acess-token', acessToken)
            .send({
                answer: 'any_answer'
            })
            .expect(200)
        })
    })
    describe('GET /surveys/:surveyId/results', () => {
        test('Should return 403 if LoadSurveyResult was called without acessToken', async () => {
            const survey = await mockSurveyModel()
            await request(app)
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            .get(`/api/surveys/${survey.id.toString()}/results`)
            .send({
            })
            .expect(403)
        })

        test('Should return 200 if LoadSurveyResult was called with acessToken', async () => {
            const res = await accountCollection.insertOne(mockAccountModel())
            const survey = await mockSurveyModel()
            await surveyResultsCollection.insertOne({
                surveyId: survey.id,
                answers: survey.answers[0].answer,
                accountId: res.insertedId,
                date: new Date()
            })
            const acessToken = sign({ id: res.insertedId }, env.jwtSecret)
            await accountCollection.updateOne({
                _id: res.insertedId
            }, {
                $set: {
                    acessToken
                }
            })
            await request(app)
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            .get(`/api/surveys/${survey.id.toString()}/results`)
            .set('x-acess-token', acessToken)
            .send({
            })
            .expect(200)
        })

        test('Should return 204 if LoadSurveyResult returns null', async () => {
            const res = await accountCollection.insertOne(mockAccountModel())
            const survey = await mockSurveyModel()
            const acessToken = sign({ id: res.insertedId }, env.jwtSecret)
            await accountCollection.updateOne({
                _id: res.insertedId
            }, {
                $set: {
                    acessToken
                }
            })
            await request(app)
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            .get(`/api/surveys/${survey.id.toString()}/results`)
            .set('x-acess-token', acessToken)
            .send({
            })
            .expect(204)
        })
    })
})
