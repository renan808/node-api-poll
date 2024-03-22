import type { Controller, LoadSurveys, SurveyModel } from './load-survey-protocols'
import { LoadSurveyController } from './load-survey-controller'

interface SutTypes {
    sut: Controller
    loadSurveysStub: LoadSurveys
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

const makeLoadSurvey = (): LoadSurveys => {
    class LoadSurveyStub implements LoadSurveys {
        async load (): Promise<SurveyModel[]> {
            return await new Promise((resolve, reject) => {
                resolve(makeFakeSurvey())
            })
        }
    }
    return new LoadSurveyStub()
}

const makeSut = (): SutTypes => {
    const loadSurveysStub = makeLoadSurvey()
    const sut = new LoadSurveyController(loadSurveysStub)
    return {
        sut,
        loadSurveysStub
    }
}

describe('Load-Survey-Controller', () => {
    test('Should call LoadSurveys', async () => {
        const { sut, loadSurveysStub } = makeSut()
        const spyLoadSurvey = jest.spyOn(loadSurveysStub, 'load')
        await sut.handle({})
        expect(spyLoadSurvey).toHaveBeenCalled()
    })
})
