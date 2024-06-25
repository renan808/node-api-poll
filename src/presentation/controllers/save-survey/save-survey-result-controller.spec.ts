import type { SaveSurveyResult, LoadSurveyById } from './save-survey-result-protocol'
import { forbidden, serverError, ok, throwError, InvalidParamError, SaveSurveyResultController } from './save-survey-result-protocol'
import Mockdate from 'mockdate'
import { mockLoadSurveyById, mockSaveSurveyResult } from '@/presentation/test/mock-save-survey-result'
import { mockRequest } from '@/domain/test/mock-save-survey-model'
import { mockSurveyResult } from '@/domain/test'
interface SutTypes {
    sut: SaveSurveyResultController
    loadSurveyById: LoadSurveyById
    saveSurveyResult: SaveSurveyResult
}

const makeSut = (): SutTypes => {
    const loadSurveyById = mockLoadSurveyById()
    const saveSurveyResult = mockSaveSurveyResult()
    const sut = new SaveSurveyResultController(loadSurveyById, saveSurveyResult)
    return {
        sut,
        loadSurveyById,
        saveSurveyResult
    }
}

describe('SaveSurveyController', () => {
    beforeAll(() => {
        Mockdate.set(new Date())
    })

    afterAll(() => {
        Mockdate.reset()
    })
    test('Should call loadSurveyById with correct values ', async () => {
        const { sut, loadSurveyById } = makeSut()
        const spyLoadSurveyById = jest.spyOn(loadSurveyById, 'loadById')
        await sut.handle(mockRequest())
        expect(spyLoadSurveyById).toHaveBeenCalledWith(mockRequest().params.surveyId)
    })

    test('Should return 403 if loadSurveyById returns null', async () => {
        const { sut, loadSurveyById } = makeSut()
        jest.spyOn(loadSurveyById, 'loadById').mockReturnValueOnce(null)
        const res = await sut.handle(mockRequest())
        expect(res).toEqual(forbidden(new InvalidParamError('surveyId')))
    })

    test('Should call saveSurveyResult with correct values', async () => {
        const { sut, saveSurveyResult } = makeSut()
        const spySaveSurvey = jest.spyOn(saveSurveyResult, 'save')
        await sut.handle(mockRequest())
        expect(spySaveSurvey).toHaveBeenCalledWith({
            surveyId: 'any_id',
            accountId: 'any_accountId',
            answer: 'any_answer',
            date: new Date()
        })
    })

    test('Should return 403 if a non-existent answer was provided', async () => {
        const { sut } = makeSut()
        const res = await sut.handle({
            params: {
                surveyId: 'any_SurveyId'
            },
            body: {
                answer: 'wrong_answer',
                accountId: 'any_accountId'
            }
        })
        expect(res).toEqual(forbidden(new InvalidParamError('answer')))
    })

    test('Should return 500 if loadSurveyById throws', async () => {
        const { sut, loadSurveyById } = makeSut()
        jest.spyOn(loadSurveyById, 'loadById').mockImplementationOnce(throwError)
        const httpResponse = await sut.handle(mockRequest())
        expect(httpResponse).toEqual(serverError(new Error()))
    })

    test('Should return 200 on success', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle(mockRequest())
        expect(httpResponse).toEqual(ok(mockSurveyResult()))
    })
})
