import type { Authentication, AuthenticationParams } from '@/domain/use-cases/account/authentication'
import type { httpRequest } from '../protocols'

export const mockAuthentication = (): Authentication => {
    class AuthenticationStub implements Authentication {
        async auth (authentication: AuthenticationParams): Promise<string> {
            return await new Promise(resolve => resolve('any_token'))
        }
    }
    return new AuthenticationStub()
}

export const mockRequest = (): httpRequest => ({
    body: {
        email: 'any_email@email.com',
        password: 'any_password'
    }
})
