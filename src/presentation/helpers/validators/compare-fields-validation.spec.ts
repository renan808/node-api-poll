import { CompareFieldValidation } from './compare-fields-validation'
import { InvalidParamError } from '../../errors'
const makeSut = (): CompareFieldValidation => {
    return new CompareFieldValidation('Field', 'FieldToCompare')
}

describe('CompareFields Validation', () => {
    test('Should return InvalidParamError if validations fails', () => {
        const sut = makeSut()
        const error = sut.validate({ Field: 'any_value', FieldToCompare: 'wrong value' })
        expect(error).toEqual(new InvalidParamError('FieldToCompare'))
    })
    test('Should not return if validation work', () => {
        const sut = makeSut()
        const error = sut.validate({ Field: 'any_value', FieldToCompare: 'any_value' })
        expect(error).toBeFalsy()
    })
})
