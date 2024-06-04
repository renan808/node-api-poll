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

const makeFakeSurvey = (): any => ({
    question: 'some_question',
    answers: [{
        answer: 'any_answer',
        image1: 'image1'
    }, {
        answer: 'response2',
        image: 'image2'
    }],
    date: new Date()
})

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
            const survey = await SurveyCollection.insertOne(makeFakeSurvey())
            await request(app)
            .put(`/api/surveys/${survey.insertedId.toString()}/results`)
            .send({
                answer: 'any_answer'
            })
            .expect(403)
        })

        test('Should return 200 if save-survey-result was called with acessToken', async () => {
            const survey = await SurveyCollection.insertOne(makeFakeSurvey())
            const res = await AccountCollection.insertOne(makeFakeAccount())
            const acessToken = sign({ id: res.insertedId }, env.jwtSecret)
            await AccountCollection.updateOne({
                _id: res.insertedId
            }, {
                $set: {
                    acessToken
                }
            })
            console.log(survey.insertedId.toString())
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
