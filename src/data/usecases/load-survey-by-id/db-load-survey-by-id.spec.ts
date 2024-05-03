import type { LoadSurveyByIdRepository, SurveyModel } from "./db-load-survey-by-id-protocol"
import { DbLoadSurveyById } from './db-load-survey-by-id'
import MockDate from 'mockdate'

interface SutTypes {
    sut: DbLoadSurveyById
    loadSurveyByIdRepositoryStub: LoadSurveyByIdRepository
}

const makeFakeSurvey = (): SurveyModel => {
    return {
        question: 'any_question1',
        answers: [{
            image: 'any_img',
            answer: 'any_answer'
        }],
        date: new Date()
    }
}

const makeLoadSurveyByIdRepositoryStub = (): LoadSurveyByIdRepository => {
    class LoadSurveyByIdRepositoryStub implements LoadSurveyByIdRepository {
        async load (id: string): Promise<SurveyModel> {
            return await new Promise(resolve => resolve(makeFakeSurvey()))
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

    test('Should call loadSurveyByIdRepositoryStub', async () => {
        const { sut, loadSurveyByIdRepositoryStub } = makeSut()
        const spyLoad = jest.spyOn(loadSurveyByIdRepositoryStub, 'load')
        await sut.load('any_token')
        expect(spyLoad).toHaveBeenCalled()
    })

    test('Should throw if LoadSurveyByIdRepositoryStub throws', async () => {
        const { sut, loadSurveyByIdRepositoryStub } = makeSut()
        jest.spyOn(loadSurveyByIdRepositoryStub, 'load').mockReturnValueOnce(
            new Promise((resolve, reject) => reject(new Error()))
        )
        const surveysPromise = sut.load('any_id')
        await expect(surveysPromise).rejects.toThrow()
    })

    test('Should return a array of surveys on success', async () => {
        const { sut } = makeSut()
        const surveys = await sut.load('any_id')
        expect(surveys).toEqual(makeFakeSurvey())
    })
})
