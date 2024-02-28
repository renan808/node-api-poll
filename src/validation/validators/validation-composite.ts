import type { Validation } from '../../presentation/protocols/validation'

export class ValidationComposite implements Validation {
    constructor (private readonly Validations: Validation[]) {}
    validate (input: any): Error | null {
        for (const validation of this.Validations) {
            const error = validation.validate(input)
            if (error) {
                return error
            }
        }
        return null
    }
}
