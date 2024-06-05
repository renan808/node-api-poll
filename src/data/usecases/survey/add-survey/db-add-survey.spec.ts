import type { AddSurveyParams, AddSurveyRepository } from './add-survey-protocols'
import { DbAddSurvey } from './db-add-survey'
import MockDate from 'mockdate'
import { mockAddSurveyParams } from '@/domain/tests'

interface SutTypes {
    sut: DbAddSurvey
    addSurveyRepositoryStub: AddSurveyRepository
}

const makeAddSurveyRepository = (): AddSurveyRepository => {
    class AddsurveyRepositoryStub implements AddSurveyRepository {
        async add (data: AddSurveyParams): Promise<void> {
            return await new Promise(resolve => resolve())
        }
    }

    return new AddsurveyRepositoryStub()
}

const makeSut = (): SutTypes => {
    const addSurveyRepositoryStub = makeAddSurveyRepository()
    const sut = new DbAddSurvey(addSurveyRepositoryStub)
    return {
        sut,
        addSurveyRepositoryStub
     }
}

describe('dbAddSurvey Usecase', () => {
    beforeAll(() => {
        MockDate.set(new Date())
    })

    afterAll(() => {
        MockDate.reset()
    })
    test('Should call AddSurveyRepository with correct values', async () => {
        const { sut, addSurveyRepositoryStub } = makeSut()
        const AddSurveySpy = jest.spyOn(addSurveyRepositoryStub, 'add')
        await sut.add(mockAddSurveyParams())
        expect(AddSurveySpy).toHaveBeenCalledWith(mockAddSurveyParams())
    })

    test('Should Throw if AddSurveyRepository throws', async () => {
        const { sut, addSurveyRepositoryStub } = makeSut()
        jest.spyOn(addSurveyRepositoryStub, 'add').mockReturnValueOnce(
            new Promise((resolve, reject) => reject(new Error()))
        )
        const promise = sut.add(mockAddSurveyParams())
        await expect(promise).rejects.toThrow()
    })
})
