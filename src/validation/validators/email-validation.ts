import type { EmailValidator } from '../protocols/emailValidator'
import type { Validation } from '@/presentation/protocols/validation'
import { InvalidParamError } from '@/presentation/errors'

export class EmailValidation implements Validation {
    constructor (private readonly FieldName: string, private readonly EmailValidator: EmailValidator) {
    }

    validate (input: any): Error | null {
        const isValid = this.EmailValidator.isValid(input[this.FieldName])
        if (!isValid) {
            return new InvalidParamError(this.FieldName)
        }
        return null
    }
}
