import type { EmailValidator } from '../../protocols/emailValidator'
import type { Validation } from './validation'
import { InvalidParamError } from '../../errors'

export class EmailValidation implements Validation {
    private readonly emailValidator: EmailValidator
    private readonly fieldName: string
    constructor (FieldName: string, EmailValidator: EmailValidator) {
        this.emailValidator = EmailValidator
        this.fieldName = FieldName
    }

    validate (input: any): any {
        const isValid = this.emailValidator.isValid(input[this.fieldName])
            if (!isValid) {
                return new InvalidParamError(this.fieldName)
            }
    }
}
