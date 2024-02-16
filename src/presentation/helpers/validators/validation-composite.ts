import type { Validation } from './validation'

export class ValidationComposite implements Validation {
    constructor (private readonly Validations: Validation[]) {}
    async validate (input: any): Promise<any> {
        for (const validation of this.Validations) {
            const error = await validation.validate(input)
            if (error) {
                return error
            }
        }
    }
}
