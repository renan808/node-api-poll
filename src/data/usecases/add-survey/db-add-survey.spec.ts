import type { AddSurveyModel, AddSurveyRepository } from './add-survey-protocols'
import { DbAddSurvey } from './db-add-survey'

interface SutTypes {
    sut: DbAddSurvey
    addSurveyRepositoryStub: AddSurveyRepository
}

const makeAddSurveyRepository = (): AddSurveyRepository => {
    class AddsurveyRepositoryStub implements AddSurveyRepository {
        async add (data: AddSurveyModel): Promise<void> {
            return await new Promise(resolve => resolve())
        }
    }

    return new AddsurveyRepositoryStub()
}

const makeFakeSurveyData = (): AddSurveyModel => ({
    question: 'any_question',
    answers: [{
        image: 'any_image',
        answer: 'any_answer'
    }]
})

const makeSut = (): SutTypes => {
    const addSurveyRepositoryStub = makeAddSurveyRepository()
    const sut = new DbAddSurvey(addSurveyRepositoryStub)
    return {
        sut,
        addSurveyRepositoryStub
     }
}

describe('dbAddSurvey Usecase', () => {
    test('Should call AddSurveyRepository with correct values', async () => {
        const { sut, addSurveyRepositoryStub } = makeSut()
        const AddSurveySpy = jest.spyOn(addSurveyRepositoryStub, 'add')
        await sut.add(makeFakeSurveyData())
        expect(AddSurveySpy).toHaveBeenCalledWith(makeFakeSurveyData())
    })

    test('Should Throw if AddSurveyRepository throws', async () => {
        const { sut, addSurveyRepositoryStub } = makeSut()
        jest.spyOn(addSurveyRepositoryStub, 'add').mockReturnValueOnce(
            new Promise((resolve, reject) => reject(new Error()))
        )
        const promise = sut.add(makeFakeSurveyData())
        await expect(promise).rejects.toThrow()
    })
})
