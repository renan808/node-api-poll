import { type Controller, type LoadSurveys, type SurveyModel, LoadSurveysController, ok, serverError, noContent } from './load-surveys-protocols'
import MockDate from 'mockdate'
import { throwError } from '@/domain/test/tests-helpers'

interface SutTypes {
    sut: Controller
    loadSurveysStub: LoadSurveys
}

const mockSurveyModel = (): SurveyModel[] => {
    return [{
        id: 'any_id',
        question: 'any_question1',
        answers: [{
            image: 'any_img',
            answer: 'any_answer'
        }],
        date: new Date()
    }, {
        id: 'any_id',
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
        async loadAll (): Promise<SurveyModel[]> {
            return await new Promise((resolve, reject) => {
                resolve(mockSurveyModel())
            })
        }
    }
    return new LoadSurveyStub()
}

const makeSut = (): SutTypes => {
    const loadSurveysStub = makeLoadSurvey()
    const sut = new LoadSurveysController(loadSurveysStub)
    return {
        sut,
        loadSurveysStub
    }
}

describe('LoadSurveyController', () => {
    beforeAll(() => {
        MockDate.set(new Date())
    })

    afterAll(() => {
        MockDate.reset()
    })

    test('Should call LoadSurvey', async () => {
        const { sut, loadSurveysStub } = makeSut()
        const spyLoadSurvey = jest.spyOn(loadSurveysStub, 'loadAll')
        await sut.handle({})
        expect(spyLoadSurvey).toHaveBeenCalled()
    })

    test('Should return 500 if LoadSurvey throws', async () => {
        const { sut, loadSurveysStub } = makeSut()
        jest.spyOn(loadSurveysStub, 'loadAll').mockImplementationOnce(throwError)
        const httpResponse = await sut.handle({})
        expect(httpResponse).toEqual(serverError(new Error()))
    })
    test('Should return 204 if LoadSurvey returns empty', async () => {
        const { sut, loadSurveysStub } = makeSut()
        jest.spyOn(loadSurveysStub, 'loadAll').mockReturnValueOnce(new Promise(resolve => resolve([])))
        const httpResponse = await sut.handle({})
        expect(httpResponse).toEqual(noContent())
    })

    test('Should return 200 and a survey array if LoadSurvey succeeds', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle({})
        expect(httpResponse).toEqual(ok(mockSurveyModel()))
    })
})
