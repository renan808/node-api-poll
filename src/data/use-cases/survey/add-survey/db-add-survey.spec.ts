import type { AddSurveyRepository } from './add-survey-protocols'
import { DbAddSurvey } from './db-add-survey'
import MockDate from 'mockdate'
import { mockAddSurveyParams } from '@/domain/test'
import { throwError } from '@/domain/test/tests-helpers'
import { mockAddSurveyRepository } from '@/data/test/mock-db-survey'

interface SutTypes {
    sut: DbAddSurvey
    addSurveyRepositoryStub: AddSurveyRepository
}

const makeSut = (): SutTypes => {
    const addSurveyRepositoryStub = mockAddSurveyRepository()
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
        jest.spyOn(addSurveyRepositoryStub, 'add').mockImplementationOnce(throwError)
        const promise = sut.add(mockAddSurveyParams())
        await expect(promise).rejects.toThrow()
    })
})
