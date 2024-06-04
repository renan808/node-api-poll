import type { SaveSurveyResultRepository, SurveyResultModel, SaveSurveyResultModel } from './db-save-survey-result-protocol'
import { DbSaveSurveyResult } from './db-save-survey-result'
import MockDate from 'mockdate'

interface SutTypes {
    sut: DbSaveSurveyResult
    saveSurveyResultRepositoryStub: SaveSurveyResultRepository
}

const makeFakeSurveyResultData = (): SaveSurveyResultModel => ({
    surveyId: 'any_survey_id',
    accountId: 'any_account_id',
    answer: 'any_answer',
    date: new Date()
})
const makeFakeSurveyResult = (): SurveyResultModel => Object.assign(
    {}, makeFakeSurveyResultData(), { id: 'any_id' }
)

const makeSaveSurveyResultRepository = (): SaveSurveyResultRepository => {
    class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
        async save (data: SaveSurveyResultModel): Promise<SurveyResultModel> {
            return await new Promise((resolve, reject) => resolve(makeFakeSurveyResult()))
        }
    }

    return new SaveSurveyResultRepositoryStub()
}

const makeSut = (): SutTypes => {
    const saveSurveyResultRepositoryStub = makeSaveSurveyResultRepository()
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
        await sut.save(makeFakeSurveyResultData())
        expect(saveSpy).toHaveBeenCalledWith(makeFakeSurveyResultData())
    })

    test('Should Throw if SaveSurveyRepository throws', async () => {
        const { sut, saveSurveyResultRepositoryStub } = makeSut()
        jest.spyOn(saveSurveyResultRepositoryStub, 'save').mockReturnValueOnce(
            new Promise((resolve, reject) => reject(new Error()))
        )
        const promise = sut.save(makeFakeSurveyResultData())
        await expect(promise).rejects.toThrow()
    })

    test('Should return an SurveyResult on success', async () => {
        const { sut } = makeSut()
        const response = await sut.save(makeFakeSurveyResultData())
        expect(response).toEqual(makeFakeSurveyResult())
    })
})
