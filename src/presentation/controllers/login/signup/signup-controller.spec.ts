import { SignUpController } from './signup-controller'
import type { AddAccount, AddAccountParams, AccountModel, httpRequest, Validation } from './signup-controler-protocols'
import { ServerError, MissingParamError } from '@/presentation/errors'
import { serverError, ok, badRequest } from '@/presentation/helpers/http/http-helper'
import type { Authentication, AuthenticationModel } from '../login/login-controler-protocols'
import { mockAccountModel } from '@/domain/tests'

const makeAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add (account: AddAccountParams): Promise<AccountModel> {
      return await new Promise(resolve => { resolve(mockAccountModel()) })
    }
  }
  return new AddAccountStub()
}

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error | null {
      return null
    }
  }
  return new ValidationStub()
}

const makeAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth (authentication: AuthenticationModel): Promise<string> {
      return await new Promise(resolve => resolve('any_token'))
    }
  }
  return new AuthenticationStub()
}

const makeFakeRequest = (): httpRequest => ({
  body: {
    email: 'any_email@email.com',
    name: 'any_name',
    password: 'any_password',
    password_confirm: 'any_password'
  }
})

interface SutTypes {
  sut: SignUpController
  AddAccountStub: AddAccount
  validationStub: Validation
  authenticationStub: Authentication
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const AddAccountStub = makeAddAccount()
  const authenticationStub = makeAuthentication()
  const sut = new SignUpController(validationStub, AddAccountStub, authenticationStub)
  return {
    sut,
    AddAccountStub,
    validationStub,
    authenticationStub
  }
}

describe('SignUp Controller', () => {
  test('Should return 500 if AddAccount throws', async () => {
    const { sut, AddAccountStub } = makeSut()
    jest.spyOn(AddAccountStub, 'add').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => { reject(new Error()) })
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new ServerError('Internal Server Error')))
  })

  test('Should Return 200 if a valid data is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok({ token: 'any_token' }))
  })

  test('Should call Validation with correct value', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(makeFakeRequest())
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should Return Error if validationStub throws', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce((new MissingParamError('any_error')))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_error')))
  })

  test('Should calls Authentication with correct Values', async () => {
    const { sut, authenticationStub } = makeSut()
    const SpyAuth = jest.spyOn(authenticationStub, 'auth')
    await sut.handle(makeFakeRequest())
    expect(SpyAuth).toHaveBeenCalledWith({
        email: 'any_email@email.com',
        password: 'any_password'
    })
  })
  test('Should return 500 if Authentication Throws', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockImplementationOnce(() => {
        throw new Error()
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
