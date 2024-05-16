import type { Collection } from 'mongodb'
import { Mongohelper } from '../helpers/mongo-helper'
import { SurveyResultMongoRepository } from './survey-result-mongo-repository'
import Mockdate from 'mockdate'
import type { AccountModel } from '@/domain/models/account'
Mockdate.set(new Date())
const makeSut = (): SurveyResultMongoRepository => {
    return new SurveyResultMongoRepository()
}

describe('Survey Result Mongo Repository', () => {
    let accountCollection: Collection
    let surveyCollection: Collection
    let surveyResultCollection: Collection
    const makeFakeSurvey = async (): Promise<any> => {
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
    const makeFakeAccount = async (): Promise<AccountModel> => {
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
        surveyResultCollection = await Mongohelper.getCollection('surveyResults')
        await surveyResultCollection.deleteMany({})
        await surveyCollection.deleteMany({})
        await accountCollection.deleteMany({})
    })
    describe('save()', () => {
        test('Should add a survey if its new', async () => {
            const sut = makeSut()
            const survey = await makeFakeSurvey()
            const account = await makeFakeAccount()
            console.log(survey)
            console.log(account)
            const res = await sut.save({
                surveyId: survey.id,
                accountId: account.id,
                answer: survey.answers[0].answers,
                date: new Date()
            })
            expect(res).toBeTruthy()
            expect(res.id).toBeTruthy()
            expect(res.surveyId).toBeTruthy()
        })
    })
})
