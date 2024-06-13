import type { Controller, Validation, AddSurvey } from './add-survey-protocols'
import { AddSurveyController } from "./add-survey-controller"
import { badRequest, ok } from '@/presentation/helpers/http/http-helper'
import Mockdate from 'mockdate'
import { mockValidation } from '@/validation/validators/test'
import { mockAddSurvey, mockRequest } from '@/presentation/test/mock-survey'

interface SutTypes {
    sut: Controller
    validationStub: Validation
    addSurveyStub: AddSurvey
}

const makeSut = (): SutTypes => {
    const addSurveyStub = mockAddSurvey()
    const validationStub = mockValidation()
    const sut = new AddSurveyController(validationStub, addSurveyStub)
    return {
        sut,
        validationStub,
        addSurveyStub
    }
}

describe('Add-survey Controller', () => {
    beforeAll(() => {
        Mockdate.set(new Date())
    })

    afterAll(() => {
        Mockdate.reset()
    })
    test('Should call Validation with correct values ', async () => {
        const { sut, validationStub } = makeSut()
        const spyValidate = jest.spyOn(validationStub, 'validate')
        const HttpRequest = mockRequest()
        await sut.handle(HttpRequest)
        expect(spyValidate).toHaveBeenCalledWith(HttpRequest.body)
    })

    test('Should return 400 if Validation fails ', async () => {
        const { sut, validationStub } = makeSut()
        jest.spyOn(validationStub, 'validate').mockReturnValueOnce((new Error()))
        const httpResponse = await sut.handle(mockRequest())
        expect(httpResponse).toEqual(badRequest(new Error()))
    })

    test('Should return 200 on sucess', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle(mockRequest())
        expect(httpResponse).toEqual(ok(mockRequest().body))
    })

    test('Should call AddSurvey with correct values', async () => {
        const { sut, addSurveyStub } = makeSut()
        const spyAddsurvey = jest.spyOn(addSurveyStub, 'add')
        await sut.handle(mockRequest())
        expect(spyAddsurvey).toHaveBeenCalledWith(mockRequest().body)
    })
})
