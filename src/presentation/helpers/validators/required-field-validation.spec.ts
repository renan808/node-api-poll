import { RequiredFieldValidation } from './required-field-validation'
import { MissingParamError } from '../../errors'
const makeSut = (): RequiredFieldValidation => {
    return new RequiredFieldValidation('field')
}

describe('RequiredField Validation', () => {
    test('Should return MissingParamError', () => {
        const sut = makeSut()
        const error = sut.validate({ name: 'any_name' })
        expect(error).toEqual(new MissingParamError('field'))
    })

    test('Should not return if validation work', () => {
        const sut = makeSut()
        const error = sut.validate({ field: 'any_name' })
        expect(error).toBeFalsy()
    })
})
