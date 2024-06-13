import type { LoadSurveysRepository, SurveyModel } from "./db-load-surveys-protocol"
import { DbLoadSurveys } from './db-load-surveys'
import MockDate from 'mockdate'
import { throwError } from "@/domain/test/tests-helpers"

interface SutTypes {
    sut: DbLoadSurveys
    loadSurveysRepositoryStub: LoadSurveysRepository
}

const mockSurveyModel = (): SurveyModel[] => {
    return [{
        id: 'any_id',
        question: 'any_question1',
        answers: [{
            image: 'any_img',
            answer: 'any_answer'
        }],
        date: new Date()
    }, {
        id: 'any_id',
        question: 'any_question2',
        answers: [{
            image: 'any_img',
            answer: 'any_answer'
        }],
        date: new Date()
    }
]
}

const makeLoadSurveysRepository = (): LoadSurveysRepository => {
    class LoadSurveysRepositoryStub implements LoadSurveysRepository {
        async loadAll (): Promise<SurveyModel[]> {
            return await Promise.resolve(mockSurveyModel())
        }
    }
    return new LoadSurveysRepositoryStub()
}

const makeSut = (): SutTypes => {
    const loadSurveysRepositoryStub = makeLoadSurveysRepository()
    const sut = new DbLoadSurveys(loadSurveysRepositoryStub)
    return {
        sut,
        loadSurveysRepositoryStub
    }
}

describe('DbLoadSurveysRepository Usecase', () => {
    beforeAll(() => {
        MockDate.set(new Date())
    })

    afterAll(() => {
        MockDate.reset()
    })

    test('Should call LoadSurveysRepository', async () => {
        const { sut, loadSurveysRepositoryStub } = makeSut()
        const spyLoadAll = jest.spyOn(loadSurveysRepositoryStub, 'loadAll')
        await sut.loadAll()
        expect(spyLoadAll).toHaveBeenCalled()
    })

    test('Should throw if LoadSurveysRepository throws', async () => {
        const { sut, loadSurveysRepositoryStub } = makeSut()
        jest.spyOn(loadSurveysRepositoryStub, 'loadAll').mockImplementationOnce(throwError)
        const surveysPromise = sut.loadAll()
        await expect(surveysPromise).rejects.toThrow()
    })

    test('Should return a array of surveys on success', async () => {
        const { sut } = makeSut()
        const surveys = await sut.loadAll()
        expect(surveys).toEqual(mockSurveyModel())
    })
})
