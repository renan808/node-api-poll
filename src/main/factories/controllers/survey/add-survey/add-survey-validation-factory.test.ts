import { RequiredFieldValidation, ValidationComposite } from '../../../../../validation/validators/index'
import type { Validation } from '../../../../../presentation/protocols/validation'
import { makeAddSurveyValidation } from './add-survey-validation-factory'
jest.mock('../../../../../validation/validators/validation-composite')

describe('AddSurveyValidation Factory', () => {
    test('Should call ValidationComposite with all validations', async () => {
        makeAddSurveyValidation()
        const validations: Validation[] = []
        for (const field of ['question', 'answers']) {
            validations.push(new RequiredFieldValidation(field))
        }
        expect(ValidationComposite).toHaveBeenCalledWith(validations)
    })
})
