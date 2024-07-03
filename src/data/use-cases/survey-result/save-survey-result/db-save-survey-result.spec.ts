import type { SaveSurveyResultRepository, LoadSurveyResultRepository } from './db-save-survey-result-protocol'
import { DbSaveSurveyResult, throwError, mockSurveyResultData, mockSaveSurveyResultRepository, mockLoadSurveyResultRepository } from './db-save-survey-result-protocol'
import MockDate from 'mockdate'
import { mockSurveyResult } from '@/domain/test'

interface SutTypes {
    sut: DbSaveSurveyResult
    saveSurveyResultRepositoryStub: SaveSurveyResultRepository
    loadSurveyResultRepositoryStub: LoadSurveyResultRepository
}
const makeSut = (): SutTypes => {
    const saveSurveyResultRepositoryStub = mockSaveSurveyResultRepository()
    const loadSurveyResultRepositoryStub = mockLoadSurveyResultRepository()
    const sut = new DbSaveSurveyResult(saveSurveyResultRepositoryStub, loadSurveyResultRepositoryStub)
    return {
        sut,
        saveSurveyResultRepositoryStub,
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

    test('Should call LoadSurveyRepository with correct values', async () => {
        const { sut, loadSurveyResultRepositoryStub } = makeSut()
        const spyLoadBySurveyId = jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId')
        await sut.save(mockSurveyResultData())
        expect(spyLoadBySurveyId).toHaveBeenCalledWith(mockSurveyResultData().surveyId)
    })

    test('Should Throw if LoadSurveyRepository throws', async () => {
        const { sut, loadSurveyResultRepositoryStub } = makeSut()
        jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId').mockImplementationOnce(throwError)
        const promise = sut.save(mockSurveyResultData())
        await expect(promise).rejects.toThrow()
    })

    test('Should add an SurveyResult on success', async () => {
        const { sut } = makeSut()
        const response = await sut.save(mockSurveyResultData())
        expect(response).toEqual(mockSurveyResult())
    })
})
