import { RequiredFieldValidation } from '../../presentation/helpers/validators/required-field-validation'
import { ValidationComposite } from '../../presentation/helpers/validators/validation-composite'
import type { Validation } from '../../presentation/helpers/validators/validation'
import { CompareFieldValidation } from '../../presentation/helpers/validators/compare-fields-validation'
export const makeSignUpValidation = (): ValidationComposite => {
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'password_confirm']) {
        validations.push(new RequiredFieldValidation(field))
    }
    const compareFieldValidation = new CompareFieldValidation('password', 'password_confirm')
    validations.push(compareFieldValidation)
    return new ValidationComposite(validations)
}
