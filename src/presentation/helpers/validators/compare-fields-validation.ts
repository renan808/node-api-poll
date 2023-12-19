import { InvalidParamError } from '../../errors'
import type { Validation } from './validation'

export class CompareFieldValidation implements Validation {
    private readonly fieldname: string
    private readonly fieldToCompareName: string
    constructor (FieldName: string, FieldToCompareName: string) {
        this.fieldname = FieldName
        this.fieldToCompareName = FieldToCompareName
    }

    validate (input: any): any {
        if (input[this.fieldname] !== input[this.fieldToCompareName]) {
            return new InvalidParamError(this.fieldToCompareName)
        }
    }
}
