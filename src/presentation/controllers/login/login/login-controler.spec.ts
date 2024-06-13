import type { Authentication, Validation } from './login-controler-protocols'
import { badRequest, ok, serverError, unauthorized } from '@/presentation/helpers/http/http-helper'
import { mockValidation, LoginController, MissingParamError } from './login-controler-protocols'
import { mockAuthentication, mockRequest } from '@/presentation/test/mock-authentication'
interface SutTypes {
    sut: LoginController
    authenticationStub: Authentication
    validationStub: Validation
}
const makeSut = (): SutTypes => {
    const authenticationStub = mockAuthentication()
    const validationStub = mockValidation()
    const sut = new LoginController(authenticationStub, validationStub)
    return {
        sut,
        authenticationStub,
        validationStub
    }
}
describe('SignUp Controller', () => {
    test('Should calls Authentication with correct Values', async () => {
        const { sut, authenticationStub } = makeSut()
        const SpyAuth = jest.spyOn(authenticationStub, 'auth')
        await sut.handle(mockRequest())
        expect(SpyAuth).toHaveBeenCalledWith({
            email: 'any_email@email.com',
            password: 'any_password'
        })
    })

    test('Should return 401 if invalid credentials are provided', async () => {
        const { sut, authenticationStub } = makeSut()
        jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(new Promise(resolve => resolve('unauthorized')))
        const httpResponse = await sut.handle(mockRequest())
        expect(httpResponse).toEqual(unauthorized())
    })

    test('Should return 500 if Authentication Throws', async () => {
        const { sut, authenticationStub } = makeSut()
        jest.spyOn(authenticationStub, 'auth').mockImplementationOnce(() => {
            throw new Error()
        })
        const httpResponse = await sut.handle(mockRequest())
        expect(httpResponse).toEqual(serverError(new Error()))
    })

    test('Should return 200 on success', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle(mockRequest())
        expect(httpResponse).toEqual(ok({
            token: 'any_token'
        }))
    })

    test('Should call Validation with correct value', async () => {
        const { sut, validationStub } = makeSut()
        const validateSpy = jest.spyOn(validationStub, 'validate')
        const httpRequest = mockRequest()
        await sut.handle(mockRequest())
        expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
      })

      test('Should Return Error if validationStub throws', async () => {
        const { sut, validationStub } = makeSut()
        jest.spyOn(validationStub, 'validate').mockReturnValueOnce((new MissingParamError('any_error')))
        const httpResponse = await sut.handle(mockRequest())
        expect(httpResponse).toEqual(badRequest(new MissingParamError('any_error')))
      })
})
