import { LoginController } from './login'
import type { EmailValidator, httpRequest, Authentication } from './login-protocols'
import { badRequest, serverError, unauthorized } from '../../helpers/http-helper'
import { InvalidParamError } from '../../errors'
const makeEmailValidator = (): EmailValidator => {
    class EmailValidatorStub implements EmailValidator {
        isValid (email: string): boolean {
            return true
        }
    }
    return new EmailValidatorStub()
}

const makeFakeRequest = (): httpRequest => ({
    body: {
        email: 'any_email@email.com',
        password: 'any_password'
    }
})

const makeAuthentication = (): Authentication => {
    class AuthenticationStub implements Authentication {
        async auth (email: string, password: string): Promise<string> {
            return await new Promise(resolve => resolve('any_token'))
        }
    }
    return new AuthenticationStub()
}

interface SutTypes {
    sut: LoginController
    emailValidatorStub: EmailValidator
    authenticationStub: Authentication
}
const makeSut = (): SutTypes => {
    const emailValidatorStub = makeEmailValidator()
    const authenticationStub = makeAuthentication()
    const sut = new LoginController(emailValidatorStub, authenticationStub)
    return {
        sut,
        emailValidatorStub,
        authenticationStub
    }
}
describe('SignUp Controller', () => {
    test('Should return 400 if no email is provided', async () => {
        const { sut } = makeSut()
        const httpRequest = {
            body: {
                password: 'any_password'
            }
        }
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statuscode).toBe(400)
    })

    test('Should return 400 if no password is provided', async () => {
        const { sut } = makeSut()
        const httpRequest = {
            body: {
                email: 'any_email@email.com'
            }
        }
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statuscode).toBe(400)
    })

    test('Should calls EmailValidator with correct Email', async () => {
        const { sut, emailValidatorStub } = makeSut()
        const spyEmailValidator = jest.spyOn(emailValidatorStub, 'isValid')
        await sut.handle(makeFakeRequest())
        expect(spyEmailValidator).toHaveBeenCalledWith('any_email@email.com')
    })

    test('Should return 400 if an invalid Email is provided', async () => {
        const { sut, emailValidatorStub } = makeSut()
        jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(badRequest(new InvalidParamError('Email')))
    })

    test('Should return 500 if EmailValidator Throws', async () => {
        const { sut, emailValidatorStub } = makeSut()
        jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
            throw new Error()
        })
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(serverError(new Error()))
    })

    test('Should calls Authentication with correct Values', async () => {
        const { sut, authenticationStub } = makeSut()
        const SpyAuth = jest.spyOn(authenticationStub, 'auth')
        await sut.handle(makeFakeRequest())
        const { email, password } = makeFakeRequest().body
        expect(SpyAuth).toHaveBeenCalledWith(email, password)
    })

    test('Should return 401 if invalid credentials are provided', async () => {
        const { sut, authenticationStub } = makeSut()
        jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(new Promise(resolve => resolve('unauthorized')))
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(unauthorized())
    })
})
