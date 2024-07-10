import type { LoadSurveyResult } from "@/domain/use-cases/survey-result/load-survey-result"
import { forbidden, type httpRequest, InvalidParamError, type LoadSurveyById, noContent, ok, serverError, throwError } from "../save-survey/save-survey-result-protocol"
import { LoadSurveyResultController } from "./load-survey-result-controller"
import { mockLoadSurveyResult } from "@/presentation/test/mock-survey-result"
import Mockdate from 'mockdate'
import { mockSurveyResult } from "@/domain/test"
import { mockLoadSurveyById } from "@/presentation/test/mock-survey"

interface SutTypes {
    sut: LoadSurveyResultController
    loadSurveyResultStub: LoadSurveyResult
    loadSurveyByIdStub: LoadSurveyById
}

const mockRequest = (): httpRequest => ({
    params: {
        surveyId: 'any_survey_id'
    },
    headers: {
        'x-acess-token': 'any_token'
    }
})

const makeSut = (): SutTypes => {
    const loadSurveyResultStub = mockLoadSurveyResult()
    const loadSurveyByIdStub = mockLoadSurveyById()
    const sut = new LoadSurveyResultController(loadSurveyResultStub, loadSurveyByIdStub)
    return {
        sut,
        loadSurveyByIdStub,
        loadSurveyResultStub
    }
}

describe('LoadSurveyResultController', () => {
    beforeAll(() => {
        Mockdate.set(new Date())
    })

    afterAll(() => {
        Mockdate.reset()
    })

    test('Should call LoadSurveyResultStub with correct values ', async () => {
        const { sut, loadSurveyResultStub } = makeSut()
        const spyLoadBySurveyId = jest.spyOn(loadSurveyResultStub, 'loadBySurveyId')
        await sut.handle(mockRequest())
        expect(spyLoadBySurveyId).toHaveBeenCalledWith(mockRequest().params.surveyId)
    })

    test('Should Return 200 on success', async () => {
        const { sut } = makeSut()
        const response = await sut.handle(mockRequest())
        expect(response).toEqual(ok(mockSurveyResult()))
    })

    test('Should Return 500 if LoadSurveyResultStub throws', async () => {
        const { sut, loadSurveyResultStub } = makeSut()
        jest.spyOn(loadSurveyResultStub, 'loadBySurveyId').mockImplementationOnce(throwError)
        const response = await sut.handle(mockRequest())
        expect(response).toEqual(serverError(new Error()))
    })

    test('Should Return 204 if LoadSurveyResultStub returns null', async () => {
        const { sut, loadSurveyResultStub } = makeSut()
        jest.spyOn(loadSurveyResultStub, 'loadBySurveyId').mockReturnValueOnce(Promise.resolve(null))
        const response = await sut.handle(mockRequest())
        expect(response).toEqual(noContent())
    })

    test('Should call loadSurveyByIdStub with correct values ', async () => {
        const { sut, loadSurveyByIdStub } = makeSut()
        const spyLoadSurveyById = jest.spyOn(loadSurveyByIdStub, 'loadById')
        await sut.handle(mockRequest())
        expect(spyLoadSurveyById).toHaveBeenCalledWith(mockRequest().params.surveyId)
    })

    test('Should return 403 if loadSurveyByIdStub returns null', async () => {
        const { sut, loadSurveyByIdStub } = makeSut()
        jest.spyOn(loadSurveyByIdStub, 'loadById').mockReturnValueOnce(Promise.resolve(null))
        const response = await sut.handle(mockRequest())
        expect(response).toEqual(forbidden(new InvalidParamError('surveyId')))
    })

    test('Should return 500 if loadSurveyByIdStub throws', async () => {
        const { sut, loadSurveyByIdStub } = makeSut()
        jest.spyOn(loadSurveyByIdStub, 'loadById').mockImplementationOnce(throwError)
        const response = await sut.handle(mockRequest())
        expect(response).toEqual(serverError(new Error()))
    })
})
