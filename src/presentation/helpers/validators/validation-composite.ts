import type { Validation } from './validation'

export class ValidationComposite implements Validation {
    constructor (private readonly Validations: Validation[]) {}
    validate (input: any): any {
        for (const validation of this.Validations) {
            const error = validation.validate(input)
            if (error) {
                return error
            }
        }
    }
}
