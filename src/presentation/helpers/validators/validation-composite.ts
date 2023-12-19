import type { Validation } from './validation'

export class ValidationComposite implements Validation {
    private readonly validations: Validation[]
    constructor (Validations: Validation[]) {
        this.validations = Validations
    }

    validate (input: any): any {
        for (const validation of this.validations) {
            const error = validation.validate(input)
            if (error) {
                return error
            }
        }
    }
}
