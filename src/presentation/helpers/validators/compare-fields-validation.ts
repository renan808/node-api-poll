import { InvalidParamError } from '../../errors'
import type { Validation } from './validation'

export class CompareFieldValidation implements Validation {
    constructor (private readonly FieldName: string, private readonly FieldToCompareName: string) {
    }

    validate (input: any): any {
        if (input[this.FieldName] !== input[this.FieldToCompareName]) {
            return new InvalidParamError(this.FieldToCompareName)
        }
    }
}
