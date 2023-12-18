import { makeSignUpValidation } from './signup-validation'
import { ValidationComposite } from '../../presentation/helpers/validation-composite'
import { RequiredFieldValidation } from '../../presentation/helpers/required-field-validation'
import type { Validation } from '../../presentation/helpers/validation'
jest.mock('../../presentation/helpers/validation-composite')
describe('SignUpValidation Factory', () => {
    test('Should call ValidationComposite with all validations', async () => {
        makeSignUpValidation()
        const validations: Validation[] = []
        for (const field of ['name', 'email', 'password', 'password_confirm']) {
            validations.push(new RequiredFieldValidation(field))
        }
        expect(ValidationComposite).toHaveBeenCalledWith(validations)
    })
})
