import { LoginController } from './login'
import type { EmailValidator, httpRequest } from '../signup/signup-protocols'
import { badRequest, serverError } from '../../helpers/http-helper'
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
interface SutTypes {
    sut: LoginController
    emailValidatorStub: EmailValidator
}
const makeSut = (): SutTypes => {
    const emailValidatorStub = makeEmailValidator()
    const sut = new LoginController(emailValidatorStub)
    return {
        sut,
        emailValidatorStub
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
})
