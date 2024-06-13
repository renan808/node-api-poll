import type { EmailValidator } from "@/validation/protocols/emailValidator"

export const mockEmailvalidator = (): EmailValidator => {
    class EmailValidatorStub implements EmailValidator {
      isValid (email: string): boolean {
        return true
      }
    }
    return new EmailValidatorStub()
  }
