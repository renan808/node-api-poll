import { type Controller, type LoadSurveys, type SurveyModel, LoadSurveyController, ok, serverError } from './load-survey-protocols'
import MockDate from 'mockdate'

interface SutTypes {
    sut: Controller
    loadSurveysStub: LoadSurveys
}

MockDate.set(new Date())

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

describe('LoadSurveyController', () => {
    test('Should call LoadSurvey', async () => {
        const { sut, loadSurveysStub } = makeSut()
        const spyLoadSurvey = jest.spyOn(loadSurveysStub, 'load')
        await sut.handle({})
        expect(spyLoadSurvey).toHaveBeenCalled()
    })

    test('Should return 500 if LoadSurvey throws', async () => {
        const { sut, loadSurveysStub } = makeSut()
        jest.spyOn(loadSurveysStub, 'load').mockReturnValueOnce(
            new Promise((resolve, reject) => reject(new Error()))
        )
        const httpResponse = await sut.handle({})
        expect(httpResponse).toEqual(serverError(new Error()))
    })

    test('Should return 200 and a survey array if LoadSurvey succeeds', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle({})
        expect(httpResponse).toEqual(ok(makeFakeSurvey()))
    })
})
