import type { Validation } from '@/presentation/protocols/validation'

export const mockValidation = (): Validation => {
    class ValidationStub implements Validation {
        validate (input: any): Error | null {
            return null
        }
    }
    const validationStub = new ValidationStub()
    return validationStub
}
