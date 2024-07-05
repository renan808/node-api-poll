import { DbLoadSurveyResult } from './db-load-survey-result'
import type { LoadSurveyResultRepository } from '@/data/protocols/db/survey-result/load-survey-result-repository'
import MockDate from 'mockdate'
import { mockLoadSurveyResultRepository } from '@/data/test/mock-db-survey'
import { throwError } from '@/domain/test/tests-helpers'
import { mockSurveyResult } from '@/domain/test'

interface SutTypes {
    sut: DbLoadSurveyResult
    loadSurveyResultRepositoryStub: LoadSurveyResultRepository
}
const makeSut = (): SutTypes => {
    const loadSurveyResultRepositoryStub = mockLoadSurveyResultRepository()
    const sut = new DbLoadSurveyResult(loadSurveyResultRepositoryStub)
    return {
        sut,
        loadSurveyResultRepositoryStub
    }
}
describe('DbLoadSurveyResult usecase', () => {
    beforeAll(() => {
        MockDate.set(new Date())
    })

    afterAll(() => {
        MockDate.reset()
    })
    test('Should call LoadSurveyRepository with correct values', async () => {
        const { sut, loadSurveyResultRepositoryStub } = makeSut()
        const loadSpy = jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId')
        await sut.loadBySurveyId('any_survey_id')
        expect(loadSpy).toHaveBeenCalledWith('any_survey_id')
    })

    test('Should Throw if LoadSurveyRepository Throws', async () => {
        const { sut, loadSurveyResultRepositoryStub } = makeSut()
        jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId').mockImplementationOnce(throwError)
        const promise = sut.loadBySurveyId('any_survey_id')
        await expect(promise).rejects.toThrow()
    })

    test('Should return an SurveyResult on success', async () => {
        const { sut } = makeSut()
        const response = await sut.loadBySurveyId('any_survey_id')
        expect(response).toEqual(mockSurveyResult())
    })
})
