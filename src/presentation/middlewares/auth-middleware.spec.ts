import { AcessDeniedError } from '../errors/index'
import { forbidden } from '../helpers/http/http-helper'
import { AuthMiddleware } from './auth-middleware'

describe('Auth Middleware', () => {
    test('Should Return 403 if no acess-token exists in header', async () => {
        const sut = new AuthMiddleware()
        const httpResponse = await sut.handle({})
        expect(httpResponse).toEqual(forbidden(new AcessDeniedError()))
    })
})
