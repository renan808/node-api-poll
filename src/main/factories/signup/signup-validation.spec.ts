import { makeSignUpValidation } from './signup-validation'
import { ValidationComposite } from '../../../presentation/helpers/validators/validation-composite'
import { RequiredFieldValidation } from '../../../presentation/helpers/validators/required-field-validation'
import type { Validation } from '../../../presentation/helpers/validators/validation'
import { CompareFieldValidation } from '../../../presentation/helpers/validators/compare-fields-validation'
import { InvalidParamError } from '../../../presentation/errors'
import { EmailValidation } from '../../../presentation/helpers/validators/email-validation'
import type { EmailValidator } from '../../../presentation/protocols/emailValidator'

jest.mock('../../../presentation/helpers/validators/validation-composite')
const makeEmailvalidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

describe('SignUpValidation Factory', () => {
    test('Should call ValidationComposite with all validations', async () => {
        makeSignUpValidation()
        const validations: Validation[] = []
        for (const field of ['name', 'email', 'password', 'password_confirm']) {
            validations.push(new RequiredFieldValidation(field))
        }
        const compareFieldValidation = new CompareFieldValidation('password', 'password_confirm')
        validations.push(compareFieldValidation)
        validations.push(new EmailValidation('email', makeEmailvalidator()))
        expect(ValidationComposite).toHaveBeenCalledWith(validations)
    })

    test('Should return InvalidParamError if CompareFieldValidation return Error', async () => {
        const httpRequest = {
          body: {
            email: 'any_email',
            name: 'any_name',
            password: 'any_password',
            password_confirm: 'awdawdawasxafdrsgdtrhg'
          }
        }
        const compareFieldValidation = new CompareFieldValidation('password', 'password_confirm')
        const error = compareFieldValidation.validate(httpRequest.body)
        expect(error).toEqual(new InvalidParamError('password_confirm'))
      })
})
