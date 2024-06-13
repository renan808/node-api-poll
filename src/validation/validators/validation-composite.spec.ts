import { ValidationComposite } from './validation-composite'
import type { Validation } from '@/presentation/protocols/validation'
import { MissingParamError } from '@/presentation/errors'
import { mockValidation } from './test'
interface SutTypes {
    sut: ValidationComposite
    validationStubs: Validation[]
}
const makeSut = (): SutTypes => {
    const validationStubs = [mockValidation(), mockValidation()]
    const sut = new ValidationComposite(validationStubs)
    return {
        sut,
        validationStubs
    }
}

describe('Validation-composite', () => {
    test('Should return Error if any validations fails', async () => {
        const { sut, validationStubs } = makeSut()
        jest.spyOn(validationStubs[0], 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
        const error = sut.validate({ Field: 'any_value' })
        expect(error).toEqual(new MissingParamError('any_field'))
    })

    test('Should return the first Error if more than one validations fails', async () => {
        const { sut, validationStubs } = makeSut()
        jest.spyOn(validationStubs[0], 'validate').mockReturnValueOnce(new Error())
        jest.spyOn(validationStubs[1], 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
        const error = sut.validate({ Field: 'any_value' })
        expect(error).toEqual(new Error())
    })

    test('Should not return if validation work', async () => {
        const { sut } = makeSut()
        const error = sut.validate({ Field: 'any_value' })
        expect(error).toBeFalsy()
    })
})
