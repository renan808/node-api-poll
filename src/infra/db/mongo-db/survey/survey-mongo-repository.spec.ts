import type { Collection } from 'mongodb'
import { Mongohelper } from '../helpers/mongo-helper'
import { SurveyMongoRepository } from './survey-mongo-repository'
import type { SurveyModel } from '@/domain/use-cases/load-surveys'
import Mockdate from 'mockdate'

Mockdate.set(new Date())

const makeSut = (): SurveyMongoRepository => {
    return new SurveyMongoRepository()
}

const makeFakeSurvey = (): SurveyModel[] => {
    return [{
        question: 'any_question1',
        answers: [{
            image: 'any_img',
            answer: 'any_answer'
        }],
        date: new Date()
    }, {
        question: 'any_question2',
        answers: [{
            image: 'any_img',
            answer: 'any_answer'
        }],
        date: new Date()
    }
]
}

describe('Survey Mongo Repository', () => {
    let surveyCollection: Collection
    beforeAll(async () => {
        await Mongohelper.connect(global.__MONGO_URI__)
    })
    afterAll(async () => {
        Mockdate.reset()
        await Mongohelper.disconnect()
    })
    beforeEach(async () => {
        surveyCollection = await Mongohelper.getCollection('surveys')
        await surveyCollection.deleteMany({})
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

    test('Should return an array of Surveys', async () => {
        const sut = makeSut()
        await surveyCollection.insertMany(makeFakeSurvey())
        const survey = await sut.loadAll()
        expect(survey.length).toBe(2)
        expect(survey[0].question).toBe('any_question1')
        expect(survey[1].question).toBe('any_question2')
    })
})
