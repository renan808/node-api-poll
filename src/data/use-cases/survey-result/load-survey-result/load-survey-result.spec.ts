import { DbLoadSurveyResult } from './db-load-survey-result'
import type { LoadSurveyResultRepository } from '@/data/protocols/db/survey-result/load-survey-result-repository'
import MockDate from 'mockdate'
import { mockLoadSurveyResultRepository } from '@/data/test/mock-db-survey'

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
describe('DbSaveSurveyResult usecase', () => {
    beforeAll(() => {
        MockDate.set(new Date())
    })

    afterAll(() => {
        MockDate.reset()
    })
    test('Should call LoadSurveyRepository with correct values', async () => {
        const { sut, loadSurveyResultRepositoryStub } = makeSut()
        const loadSpy = jest.spyOn(loadSurveyResultRepositoryStub, 'load')
        await sut.load('any_survey_id')
        expect(loadSpy).toHaveBeenCalledWith('any_survey_id')
    })
})
