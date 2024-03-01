import type { Controller, httpRequest, Validation, AddSurveyModel, AddSurvey } from './add-survey-protocols'
import { AddSurveyController } from "./add-survey-controller"
import { badRequest, ok } from '../../../helpers/http/http-helper'
interface SutTypes {
    sut: Controller
    validationStub: Validation
    addSurveyStub: AddSurvey
}

const makeFakeRequest = (): httpRequest => ({
    body: {
        question: 'any_question',
        answers: [{
            image: 'any_image',
            answer: 'any_answer'
        }]
    }
})

const makeAddSurvey = (): AddSurvey => {
    class AddSurveyStub implements AddSurvey {
        async add (data: AddSurveyModel): Promise<void> {
        }
    }
    return new AddSurveyStub()
}

const makeValidation = (): Validation => {
    class ValidationStub implements Validation {
        validate (input: any): Error | null {
            return null
        }
    }
    return new ValidationStub()
}
const makeSut = (): SutTypes => {
    const addSurveyStub = makeAddSurvey()
    const validationStub = makeValidation()
    const sut = new AddSurveyController(validationStub, addSurveyStub)
    return {
        sut,
        validationStub,
        addSurveyStub
    }
}

describe('Add-survey Controller', () => {
    test('Should call Validation with correct values ', async () => {
        const { sut, validationStub } = makeSut()
        const spyValidate = jest.spyOn(validationStub, 'validate')
        const HttpRequest = makeFakeRequest()
        await sut.handle(HttpRequest)
        expect(spyValidate).toHaveBeenCalledWith(HttpRequest.body)
    })

    test('Should return 400 if Validation fails ', async () => {
        const { sut, validationStub } = makeSut()
        jest.spyOn(validationStub, 'validate').mockReturnValueOnce((new Error()))
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(badRequest(new Error()))
    })

    test('Should return 200 on sucess', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(ok(makeFakeRequest().body))
    })

    test('Should call AddSurvey with correct values', async () => {
        const { sut, addSurveyStub } = makeSut()
        const spyAddsurvey = jest.spyOn(addSurveyStub, 'add')
        await sut.handle(makeFakeRequest())
        expect(spyAddsurvey).toHaveBeenCalledWith(makeFakeRequest().body)
    })
})
