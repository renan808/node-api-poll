import type { EmailValidator } from '@/validation/protocols/emailValidator'
import validator from 'validator'
export class EmailValidatorAdapter implements EmailValidator {
    isValid (email: string): boolean {
        return validator.isEmail(email)
    }
}
