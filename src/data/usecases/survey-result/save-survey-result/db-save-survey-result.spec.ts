import type { SaveSurveyResultRepository } from './db-save-survey-result-protocol'
import { DbSaveSurveyResult } from './db-save-survey-result'
import MockDate from 'mockdate'
import { throwError } from '@/domain/test/tests-helpers'
import { mockSaveSurveyResultRepository, mockSurveyResultData, mockSurveyResult } from '@/domain/test'
interface SutTypes {
    sut: DbSaveSurveyResult
    saveSurveyResultRepositoryStub: SaveSurveyResultRepository
}
const makeSut = (): SutTypes => {
    const saveSurveyResultRepositoryStub = mockSaveSurveyResultRepository()
    const sut = new DbSaveSurveyResult(saveSurveyResultRepositoryStub)
    return {
        sut,
        saveSurveyResultRepositoryStub
     }
}

describe('DbSaveSurveyResult usecase', () => {
    beforeAll(() => {
        MockDate.set(new Date())
    })

    afterAll(() => {
        MockDate.reset()
    })
    test('Should call SaveSurveyRepository with correct values', async () => {
        const { sut, saveSurveyResultRepositoryStub } = makeSut()
        const saveSpy = jest.spyOn(saveSurveyResultRepositoryStub, 'save')
        await sut.save(mockSurveyResultData())
        expect(saveSpy).toHaveBeenCalledWith(mockSurveyResultData())
    })

    test('Should Throw if SaveSurveyRepository throws', async () => {
        const { sut, saveSurveyResultRepositoryStub } = makeSut()
        jest.spyOn(saveSurveyResultRepositoryStub, 'save').mockImplementationOnce(throwError)
        const promise = sut.save(mockSurveyResultData())
        await expect(promise).rejects.toThrow()
    })

    test('Should return an SurveyResult on success', async () => {
        const { sut } = makeSut()
        const response = await sut.save(mockSurveyResultData())
        expect(response).toEqual(mockSurveyResult())
    })
})
