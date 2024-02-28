import { MissingParamError } from '../../presentation/errors'
import type { Validation } from '../../presentation/protocols/validation'
export class RequiredFieldValidation implements Validation {
    constructor (private readonly FieldName: string) {
    }

    validate (input: any): Error | null {
        if (!input[this.FieldName]) {
            return new MissingParamError(this.FieldName)
        }
        return null
    }
}
