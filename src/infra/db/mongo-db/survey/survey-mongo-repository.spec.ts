import type { Collection } from 'mongodb'
import { Mongohelper } from '../helpers/mongo-helper'
import { SurveyMongoRepository } from './survey-mongo-repository'
import type { AddSurveyRepository } from '../../../../data/usecases/add-survey/add-survey-protocols'

const makeSut = (): AddSurveyRepository => {
    return new SurveyMongoRepository()
}

describe('Survey Mongo Repository', () => {
    let surveyCollection: Collection
    beforeAll(async () => {
        await Mongohelper.connect(global.__MONGO_URI__)
    })
    afterAll(async () => {
        await Mongohelper.disconnect()
    })
    beforeEach(async () => {
        surveyCollection = await Mongohelper.getCollection('surveys')
    })
    test('Should add one survey on success', async () => {
        const sut = makeSut()
        await sut.add({
            question: 'any_question',
            answers: [{
                image: 'any_image',
                answer: 'any_answer'
            }],
            date: new Date()
        })
        const newSurvey = await surveyCollection.findOne({
            question: 'any_question'
        })
        expect(newSurvey).toBeTruthy()
    })
})
