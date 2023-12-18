import { RequiredFieldValidation } from '../../presentation/helpers/required-field-validation'
import { ValidationComposite } from '../../presentation/helpers/validation-composite'
import type { Validation } from '../../presentation/helpers/validation'
export const makeSignUpValidation = (): ValidationComposite => {
    const validations: Validation[] = []
        for (const field of ['name', 'email', 'password', 'password_confirm']) {
            validations.push(new RequiredFieldValidation(field))
        }
    return new ValidationComposite(validations)
}
