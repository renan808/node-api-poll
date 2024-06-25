import type { Collection } from 'mongodb'
import { Mongohelper } from '../helpers/mongo-helper'
import { SurveyResultMongoRepository } from './survey-result-mongo-repository'
import Mockdate from 'mockdate'
import type { AccountModel } from '@/domain/models/account'
import type { SurveyModel } from '@/domain/models/survey'
import { ObjectId } from 'mongodb'

Mockdate.set(new Date())
const makeSut = (): SurveyResultMongoRepository => {
    return new SurveyResultMongoRepository()
}

describe('Survey Result Mongo Repository', () => {
    let accountCollection: Collection
    let surveyCollection: Collection
    let surveyResultsCollection: Collection
    const mockSurveyModel = async (): Promise<SurveyModel> => {
        const idSurvey = await surveyCollection.insertOne({
            quesiton: 'any_question',
            answers: [{
                image: 'any_image',
                answer: 'any_answer'
            }, {
                answer: 'other_answer'
            }]
        })
        const survey = await surveyCollection.findOne({ _id: idSurvey.insertedId })
        return Mongohelper.map(survey)
}
    const mockAccount = async (): Promise<AccountModel> => {
        await accountCollection.insertOne({
            email: 'any_email@email.com',
            name: 'any_name',
            password: 'any_password'
        })
        const account = await accountCollection.findOne({ name: 'any_name' })
        return Mongohelper.map(account)
    }
    beforeAll(async () => {
        await Mongohelper.connect(global.__MONGO_URI__)
    })
    afterAll(async () => {
        Mockdate.reset()
        await Mongohelper.disconnect()
    })
    beforeEach(async () => {
        surveyCollection = await Mongohelper.getCollection('surveys')
        accountCollection = await Mongohelper.getCollection('account')
        surveyResultsCollection = await Mongohelper.getCollection('surveyResults')
        await surveyResultsCollection.deleteMany({})
        await surveyCollection.deleteMany({})
        await accountCollection.deleteMany({})
    })
    describe('save()', () => {
        test('Should add a survey result if its new', async () => {
            const sut = makeSut()
            const survey = await mockSurveyModel()
            const account = await mockAccount()
            const res = await sut.save({
                surveyId: survey.id,
                accountId: account.id,
                answer: survey.answers[0].answer,
                date: new Date()
            })
            expect(res).toBeTruthy()
            expect(res.surveyId).toEqual(survey.id)
            expect(res.answers[0].count).toBe(1)
            expect(res.answers[0].percent).toBe(100)
        })

        test('Should update a survey result if its not new', async () => {
            const sut = makeSut()
            const survey = await mockSurveyModel()
            const account = await mockAccount()
            await surveyResultsCollection.insertOne({
                surveyId: new ObjectId(survey.id),
                accountId: new ObjectId(account.id),
                answer: survey.answers[0].answer,
                date: new Date()
            })
            const res = await sut.save({
                surveyId: survey.id,
                accountId: account.id,
                answer: survey.answers[1].answer,
                date: new Date()
            })

            expect(res).toBeTruthy()
            expect(res.surveyId).toEqual(survey.id)
            expect(res.answers[0].count).toBe(1)
            expect(res.answers[0].percent).toBe(100)
        })
    })
})
