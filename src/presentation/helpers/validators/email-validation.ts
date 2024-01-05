import type { EmailValidator } from '../../protocols/emailValidator'
import type { Validation } from './validation'
import { InvalidParamError } from '../../errors'

export class EmailValidation implements Validation {
    constructor (private readonly FieldName: string, private readonly EmailValidator: EmailValidator) {
    }

    validate (input: any): any {
        const isValid = this.EmailValidator.isValid(input[this.FieldName])
        if (!isValid) {
            return new InvalidParamError(this.FieldName)
        }
    }
}
