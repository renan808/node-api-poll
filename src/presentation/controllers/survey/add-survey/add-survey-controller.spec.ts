import type { Controller, httpRequest, Validation } from './add-survey-protocols'
import { AddSurveyController } from "./add-survey-controller"
import { badRequest } from '../../../helpers/http/http-helper'
interface SutTypes {
    sut: Controller
    validationStub: Validation
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

const makeValidation = (): Validation => {
    class ValidationStub implements Validation {
        validate (input: any): Error | null {
            return null
        }
    }
    return new ValidationStub()
}
const makeSut = (): SutTypes => {
    const validationStub = makeValidation()
    const sut = new AddSurveyController(validationStub)
    return {
        sut,
        validationStub
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
})
