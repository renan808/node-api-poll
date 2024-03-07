import { AcessDeniedError } from '../errors/index'
import { forbidden } from '../helpers/http/http-helper'
import { AuthMiddleware } from './auth-middleware'
import type { LoadAccountByToken } from '../../domain/use-cases/load-account-by-token'
import type { AccountModel } from '../../domain/models/account'

const makeLoadAccountByTokenStub = (): LoadAccountByToken => {
    class LoadAccountByTokenStub implements LoadAccountByToken {
        async load (acessToken: string, role?: string): Promise<AccountModel | null> {
            return await new Promise(resolve => resolve(null))
        }
    }
    return new LoadAccountByTokenStub()
}

describe('Auth Middleware', () => {
    test('Should Return 403 if no acess-token exists in header', async () => {
        const sut = new AuthMiddleware(makeLoadAccountByTokenStub())
        const httpResponse = await sut.handle({})
        expect(httpResponse).toEqual(forbidden(new AcessDeniedError()))
    })

    test('Should call LoadAccountByToken with correct acess token', async () => {
        const loadAccountByTokenStub = makeLoadAccountByTokenStub()
        const loadbyTokenSpy = jest.spyOn(loadAccountByTokenStub, 'load')
        const sut = new AuthMiddleware(loadAccountByTokenStub)
        await sut.handle({
            headers: {
                'x-acess-token': 'any_token'
            }
        })
        expect(loadbyTokenSpy).toHaveBeenCalledWith('any_token')
    })
})
