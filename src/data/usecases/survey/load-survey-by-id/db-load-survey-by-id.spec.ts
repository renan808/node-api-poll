import type { LoadSurveyByIdRepository } from "./db-load-survey-by-id-protocol"
import { DbLoadSurveyById } from './db-load-survey-by-id'
import MockDate from 'mockdate'
import { mockSurveyModel } from "@/domain/test"
import { throwError } from "@/domain/test/tests-helpers"
import { mockLoadSurveyByIdRepository } from "@/data/test/mock-db-survey"

interface SutTypes {
    sut: DbLoadSurveyById
    loadSurveyByIdRepositoryStub: LoadSurveyByIdRepository
}

const makeSut = (): SutTypes => {
    const loadSurveyByIdRepositoryStub = mockLoadSurveyByIdRepository()
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
        jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById').mockImplementationOnce(throwError)
        const surveysPromise = sut.loadById('any_id')
        await expect(surveysPromise).rejects.toThrow()
    })

    test('Should return a survey on success', async () => {
        const { sut } = makeSut()
        const surveys = await sut.loadById('any_id')
        expect(surveys).toEqual(mockSurveyModel())
    })
})
