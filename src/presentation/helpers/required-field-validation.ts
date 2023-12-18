import { MissingParamError } from '../errors'
import type { Validation } from './validation'

export class RequiredFieldValidation implements Validation {
    private readonly fieldname: string
    constructor (FieldName: string) {
        this.fieldname = FieldName
    }

    validate (input: any): any {
        if (!input[this.fieldname]) {
            return new MissingParamError(this.fieldname)
        }
    }
}
