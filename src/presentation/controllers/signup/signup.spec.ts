import { SignUpController } from './signup'
import type { AddAccount, AddAccountModel, AccountModel, httpRequest, Validation } from './signup-protocols'
import { ServerError, MissingParamError } from '../../errors'
import { serverError, ok, badRequest } from '../../helpers/http-helper'

const makeAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add (account: AddAccountModel): Promise<AccountModel> {
      return await new Promise(resolve => { resolve(makeFakeAccount()) })
    }
  }
  return new AddAccountStub()
}

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): any {
      return null
    }
  }
  return new ValidationStub()
}

const makeFakeRequest = (): httpRequest => ({
  body: {
    email: 'any_email@email.com',
    name: 'any_name',
    password: 'any_password',
    password_confirm: 'any_password'
  }
})

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  email: 'valid_email@email.com',
  name: 'valid_name',
  password: 'valid_password'
})

interface SutTypes {
  sut: SignUpController
  AddAccountStub: AddAccount
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const AddAccountStub = makeAddAccount()
  const sut = new SignUpController(AddAccountStub, validationStub)
  return {
    sut,
    AddAccountStub,
    validationStub
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
    expect(httpResponse).toEqual(ok(makeFakeAccount()))
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
})
