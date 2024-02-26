import { InvalidParamError } from '../../presentation/errors'
import type { Validation } from '../../presentation/protocols/validation'

export class CompareFieldValidation implements Validation {
    constructor (private readonly FieldName: string, private readonly FieldToCompareName: string) {
    }

    validate (input: any): any {
        if (input[this.FieldName] !== input[this.FieldToCompareName]) {
            return new InvalidParamError(this.FieldToCompareName)
        }
    }
}
