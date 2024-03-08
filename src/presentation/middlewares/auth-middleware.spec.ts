import { AcessDeniedError } from '../errors/index'
import { forbidden } from '../helpers/http/http-helper'
import { AuthMiddleware } from './auth-middleware'
import type { LoadAccountByToken } from '../../domain/use-cases/load-account-by-token'
import type { AccountModel } from '../../domain/models/account'
import type { httpRequest } from '../protocols'

interface SutTypes {
    sut: AuthMiddleware
    loadAccountByTokenStub: LoadAccountByToken
}

const makeFakeRequest = (): httpRequest => ({
    headers: {
        'x-acess-token': 'any_token'
    }
})

const makeLoadAccountByTokenStub = (): LoadAccountByToken => {
    class LoadAccountByTokenStub implements LoadAccountByToken {
        async load (acessToken: string, role?: string): Promise<AccountModel | null> {
            return await new Promise(resolve => resolve(null))
        }
    }
    return new LoadAccountByTokenStub()
}

const makeSut = (): SutTypes => {
    const loadAccountByTokenStub = makeLoadAccountByTokenStub()
    const sut = new AuthMiddleware(loadAccountByTokenStub)
    return {
        sut,
        loadAccountByTokenStub
    }
}

describe('Auth Middleware', () => {
    test('Should Return 403 if no acess-token exists in header', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle({})
        expect(httpResponse).toEqual(forbidden(new AcessDeniedError()))
    })

    test('Should call LoadAccountByToken with correct acess token', async () => {
        const { sut, loadAccountByTokenStub } = makeSut()
        const loadbyTokenSpy = jest.spyOn(loadAccountByTokenStub, 'load')
        await sut.handle(makeFakeRequest())
        expect(loadbyTokenSpy).toHaveBeenCalledWith('any_token')
    })
})
