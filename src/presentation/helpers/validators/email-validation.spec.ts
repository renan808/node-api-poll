import { EmailValidation } from './email-validation'
import type { EmailValidator } from '../../protocols/emailValidator'
import { InvalidParamError } from '../../errors'

const makeEmailvalidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

interface SutTypes {
  sut: EmailValidation
  emailValidatorStub: EmailValidator
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailvalidator()
  const sut = new EmailValidation('email', emailValidatorStub)
  return {
    sut,
    emailValidatorStub
  }
}

describe('Email Validation', () => {
  test('Should return an error if EmailValidator return false', () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const error = sut.validate({ email: 'invalid_email@email.com' })
    expect(error).toEqual(new InvalidParamError('email'))
  })

  test('Should call emailValidator with correct email', async () => {
    const { sut, emailValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    await sut.validate({ email: 'any_email@email.com' })
    expect(isValidSpy).toHaveBeenCalledWith('any_email@email.com')
  })

  test('Should throw if EmailValidator throws', () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    sut.validate({ email: 'any_email@email.com' })
    expect(sut.validate).toThrow()
  })
})
