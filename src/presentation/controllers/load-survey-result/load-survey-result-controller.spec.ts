import type { LoadSurveyResult } from "@/domain/use-cases/survey-result/load-survey-result"
import { forbidden, type httpRequest, InvalidParamError, ok, serverError, throwError } from "../save-survey/save-survey-result-protocol"
import { LoadSurveyResultController } from "./load-survey-result-controller"
import { mockLoadSurveyResult } from "@/presentation/test/mock-save-survey-result"
import Mockdate from 'mockdate'
import { mockSurveyResult } from "@/domain/test"

interface SutTypes {
    sut: LoadSurveyResultController
    loadSurveyResult: LoadSurveyResult
}

const mockRequest = (): httpRequest => ({
    body: 'any_survey_id',
    headers: {
        'x-acess-token': 'any_token'
    }
})

const makeSut = (): SutTypes => {
    const loadSurveyResult = mockLoadSurveyResult()
    const sut = new LoadSurveyResultController(loadSurveyResult)
    return {
        sut,
        loadSurveyResult
    }
}

describe('LoadSurveyResultController', () => {
    beforeAll(() => {
        Mockdate.set(new Date())
    })

    afterAll(() => {
        Mockdate.reset()
    })
    test('Should call loadSurveyById with correct values ', async () => {
        const { sut, loadSurveyResult } = makeSut()
        const spyLoadBySurveyId = jest.spyOn(loadSurveyResult, 'loadBySurveyId')
        await sut.handle(mockRequest())
        expect(spyLoadBySurveyId).toHaveBeenCalledWith(mockRequest().body)
    })

    test('Should Return 200 on success', async () => {
        const { sut } = makeSut()
        const response = await sut.handle(mockRequest())
        expect(response).toEqual(ok(mockSurveyResult()))
    })

    test('Should Return 500 if LoadSurveyResult throws', async () => {
        const { sut, loadSurveyResult } = makeSut()
        jest.spyOn(loadSurveyResult, 'loadBySurveyId').mockImplementationOnce(throwError)
        const response = await sut.handle(mockRequest())
        expect(response).toEqual(serverError(new Error()))
    })

    test('Should Return 403 if LoadSurveyResult returns null', async () => {
        const { sut, loadSurveyResult } = makeSut()
        jest.spyOn(loadSurveyResult, 'loadBySurveyId').mockReturnValueOnce(Promise.resolve(null))
        const response = await sut.handle(mockRequest())
        expect(response).toEqual(forbidden(new InvalidParamError('surveyId')))
    })
})
