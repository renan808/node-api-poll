import type { LoadSurveyByIdRepository, SurveyModel } from "./db-load-survey-by-id-protocol"
import { DbLoadSurveyById } from './db-load-survey-by-id'
import MockDate from 'mockdate'
import { mockSurveyModel } from "@/domain/tests"
interface SutTypes {
    sut: DbLoadSurveyById
    loadSurveyByIdRepositoryStub: LoadSurveyByIdRepository
}

const makeLoadSurveyByIdRepositoryStub = (): LoadSurveyByIdRepository => {
    class LoadSurveyByIdRepositoryStub implements LoadSurveyByIdRepository {
        async loadById (id: string): Promise<SurveyModel> {
            return await new Promise(resolve => resolve(mockSurveyModel()))
        }
    }
    return new LoadSurveyByIdRepositoryStub()
}

const makeSut = (): SutTypes => {
    const loadSurveyByIdRepositoryStub = makeLoadSurveyByIdRepositoryStub()
    const sut = new DbLoadSurveyById(loadSurveyByIdRepositoryStub)
    return {
        sut,
        loadSurveyByIdRepositoryStub
    }
}

describe('DbLoadSurveyById Usecase', () => {
    beforeAll(() => {
        MockDate.set(new Date())
    })

    afterAll(() => {
        MockDate.reset()
    })

    test('Should call loadById', async () => {
        const { sut, loadSurveyByIdRepositoryStub } = makeSut()
        const spyLoad = jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById')
        await sut.loadById('any_id')
        expect(spyLoad).toHaveBeenCalled()
    })

    test('Should throw if LoadSurveyByIdRepositoryStub throws', async () => {
        const { sut, loadSurveyByIdRepositoryStub } = makeSut()
        jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById').mockReturnValueOnce(
            new Promise((resolve, reject) => reject(new Error()))
        )
        const surveysPromise = sut.loadById('any_id')
        await expect(surveysPromise).rejects.toThrow()
    })

    test('Should return a survey on success', async () => {
        const { sut } = makeSut()
        const surveys = await sut.loadById('any_id')
        expect(surveys).toEqual(mockSurveyModel())
    })
})
