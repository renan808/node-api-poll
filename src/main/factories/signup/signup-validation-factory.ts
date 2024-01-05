import { RequiredFieldValidation, ValidationComposite, CompareFieldValidation, EmailValidation } from '../../../presentation/helpers/validators/index'
import type { Validation } from '../../../presentation/helpers/validators/validation'
import { EmailValidatorAdapter } from '../../../utils/email-validator-adapter'
import { ExistInDB } from '../../../presentation/helpers/validators/exist-in-db-validation'
export const makeSignUpValidation = (): ValidationComposite => {
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'password_confirm']) {
        validations.push(new RequiredFieldValidation(field))
    }
    const compareFieldValidation = new CompareFieldValidation('password', 'password_confirm')
    validations.push(compareFieldValidation)
    validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
    validations.push(new ExistInDB())
    return new ValidationComposite(validations)
}
