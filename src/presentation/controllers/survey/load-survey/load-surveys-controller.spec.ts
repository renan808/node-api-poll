import { type Controller, type LoadSurveys, LoadSurveysController, ok, serverError, noContent, mockLoadSurveys } from './load-surveys-protocols'
import MockDate from 'mockdate'
import { throwError } from '@/domain/test/tests-helpers'
import { mockSurveysModel } from '@/domain/test'

interface SutTypes {
    sut: Controller
    loadSurveysStub: LoadSurveys
}

const makeSut = (): SutTypes => {
    const loadSurveysStub = mockLoadSurveys()
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
        expect(httpResponse).toEqual(ok(mockSurveysModel()))
    })
})
