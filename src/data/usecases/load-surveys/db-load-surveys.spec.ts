import type { LoadSurveysRepository, SurveyModel } from "./db-load-surveys-protocol"
import { DbLoadSurveys } from './db-load-surveys'
import MockDate from 'mockdate'

interface SutTypes {
    sut: DbLoadSurveys
    loadSurveysRepositoryStub: LoadSurveysRepository
}

const makeFakeSurvey = (): SurveyModel[] => {
    return [{
        question: 'any_question1',
        answers: [{
            image: 'any_img',
            answer: 'any_answer'
        }],
        date: new Date()
    }, {
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
            return await new Promise(resolve => resolve(makeFakeSurvey()))
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
        jest.spyOn(loadSurveysRepositoryStub, 'loadAll').mockReturnValueOnce(
            new Promise((resolve, reject) => reject(new Error()))
        )
        const surveysPromise = sut.loadAll()
        await expect(surveysPromise).rejects.toThrow()
    })

    test('Should return a array of surveys on success', async () => {
        const { sut } = makeSut()
        const surveys = await sut.loadAll()
        expect(surveys).toEqual(makeFakeSurvey())
    })
})
