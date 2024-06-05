import type { LoadSurveyById, SurveyModel, httpRequest, SaveSurveyResult, SaveSurveyResultModel, SurveyResultModel } from './save-survey-result-protocol'
import { SaveSurveyResultController } from './save-survey-result-controller'
import { forbidden, serverError, ok } from './save-survey-result-protocol'
import { InvalidParamError } from '@/presentation/errors'
import Mockdate from 'mockdate'
import { mockSurveyModel } from '@/domain/tests'
import { throwError } from '@/domain/tests/tests-helpers'

const makeFakeRequest = (): httpRequest => ({
    params: {
        surveyId: 'any_SurveyId'
    },
    body: {
        answer: 'any_answer'
    },
    accountId: 'any_accountId'
})

const makeFakeSurveyResult = (): SurveyResultModel => ({
    surveyId: 'any_SurveyId',
    id: 'any_id',
    accountId: 'any_accountId',
    answer: 'any_answer',
    date: new Date()
})

const makeLoadSurveyById = (): LoadSurveyById => {
    class LoadSurveyByIdStub implements LoadSurveyById {
        async loadById (id: string): Promise<SurveyModel> {
            return await new Promise(resolve => resolve(mockSurveyModel()))
        }
    }
    return new LoadSurveyByIdStub()
}
const makeSaveSurveyResult = (): SaveSurveyResult => {
    class SaveSurveyResultStub implements SaveSurveyResult {
        async save (data: SaveSurveyResultModel): Promise<SurveyResultModel> {
            return await new Promise((resolve, reject) => resolve(makeFakeSurveyResult()))
        }
    }
    return new SaveSurveyResultStub()
}

interface SutTypes {
    sut: SaveSurveyResultController
    loadSurveyById: LoadSurveyById
    saveSurveyResult: SaveSurveyResult
}

const makeSut = (): SutTypes => {
    const loadSurveyById = makeLoadSurveyById()
    const saveSurveyResult = makeSaveSurveyResult()
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
        await sut.handle(makeFakeRequest())
        expect(spyLoadSurveyById).toHaveBeenCalledWith(makeFakeRequest().params.surveyId)
    })

    test('Should return 403 if loadSurveyById returns null', async () => {
        const { sut, loadSurveyById } = makeSut()
        jest.spyOn(loadSurveyById, 'loadById').mockReturnValueOnce(null)
        const res = await sut.handle(makeFakeRequest())
        expect(res).toEqual(forbidden(new InvalidParamError('surveyId')))
    })

    test('Should call saveSurveyResult with correct values', async () => {
        const { sut, saveSurveyResult } = makeSut()
        const spySaveSurvey = jest.spyOn(saveSurveyResult, 'save')
        await sut.handle(makeFakeRequest())
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
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(serverError(new Error()))
    })

    test('Should return 200 on success', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(ok({
            id: 'any_id',
            surveyId: 'any_SurveyId',
            accountId: 'any_accountId',
            answer: 'any_answer',
            date: new Date()
        }))
    })
})
