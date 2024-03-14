import { makeLoginValidation } from './login-validation-factory'
import { ValidationComposite, RequiredFieldValidation, EmailValidation, type Validation } from '../../../../../validation/validators/index'
import type { EmailValidator } from '../../../../../validation/protocols/emailValidator'
jest.mock('../../../../../validation/validators/validation-composite')
const makeEmailvalidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

describe('LoginValidation factory', () => {
    test('Should call ValidationComposite with all validations', async () => {
        makeLoginValidation()
        const validations: Validation[] = []
        for (const field of ['email', 'password']) {
            validations.push(new RequiredFieldValidation(field))
        }
        validations.push(new EmailValidation('email', makeEmailvalidator()))
        expect(ValidationComposite).toHaveBeenCalledWith(validations)
    })
})
