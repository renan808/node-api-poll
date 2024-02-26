import { RequiredFieldValidation, ValidationComposite, EmailValidation } from '../../../../validation/validators/index'
import type { Validation } from '../../../../validation/validators/validation'
import { EmailValidatorAdapter } from '../../../../utils/email-validator-adapter'

export const makeLoginValidation = (): ValidationComposite => {
    const validations: Validation[] = []
    for (const field of ['email', 'password']) {
        validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
    return new ValidationComposite(validations)
}
