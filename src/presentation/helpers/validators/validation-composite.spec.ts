import { ValidationComposite } from './validation-composite'
import type { Validation } from './validation'
import { MissingParamError } from '../../errors'

describe('Validation-composite', () => {
    test('Should return Error if any validations fails', () => {
        class ValidationStub implements Validation {
            validate (input: any): any {
                return new MissingParamError('any_field')
            }
        }
        const sut = new ValidationComposite([new ValidationStub()])
        const error = sut.validate({ Field: 'any_value' })
        expect(error).toEqual(new MissingParamError('any_field'))
    })
})
