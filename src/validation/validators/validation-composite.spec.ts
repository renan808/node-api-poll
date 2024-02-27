import { ValidationComposite } from './validation-composite'
import type { Validation } from '../../presentation/protocols/validation'
import { MissingParamError } from '../../presentation/errors'

const makeValidation = (): Validation => {
    class ValidationStub implements Validation {
        validate (input: any): any {
            return null
        }
    }
    const validationStub = new ValidationStub()
    return validationStub
}
interface SutTypes {
    sut: ValidationComposite
    validationStubs: Validation[]
}
const makeSut = (): SutTypes => {
    const validationStubs = [makeValidation(), makeValidation()]
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
        const error = await sut.validate({ Field: 'any_value' })
        expect(error).toEqual(new MissingParamError('any_field'))
    })

    test('Should return the first Error if more than one validations fails', async () => {
        const { sut, validationStubs } = makeSut()
        jest.spyOn(validationStubs[0], 'validate').mockReturnValueOnce(new Error())
        jest.spyOn(validationStubs[1], 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
        const error = await sut.validate({ Field: 'any_value' })
        expect(error).toEqual(new Error())
    })

    test('Should not return if validation work', async () => {
        const { sut } = makeSut()
        const error = await sut.validate({ Field: 'any_value' })
        expect(error).toBeFalsy()
    })
})