import { makeLoginValidation } from './login-validation-factory'
import { ValidationComposite, RequiredFieldValidation, EmailValidation } from '../../../../presentation/helpers/validators/index'
import type { Validation } from '../../../../presentation/helpers/validators/index'
import type { EmailValidator } from '../../../../presentation/protocols/emailValidator'
jest.mock('../../../../presentation/helpers/validators/validation-composite')
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
