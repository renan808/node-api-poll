import { AcessDeniedError } from '../errors/index'
import { forbidden, ok, serverError } from '../helpers/http/http-helper'
import { AuthMiddleware } from './auth-middleware'
import type { LoadAccountByToken } from '@/domain/use-cases/account/load-account-by-token'
import type { AccountModel } from '@/domain/models/account'
import type { httpRequest } from '../protocols'
import { mockAccountModel } from '@/domain/test'
import { throwError } from '@/domain/test/tests-helpers'

interface SutTypes {
    sut: AuthMiddleware
    loadAccountByTokenStub: LoadAccountByToken
}

const mockRequest = (): httpRequest => ({
    headers: {
        'x-acess-token': 'any_token'
    }
})

const mockLoadAccountByTokenStub = (): LoadAccountByToken => {
    class LoadAccountByTokenStub implements LoadAccountByToken {
        async load (acessToken: string, role?: string): Promise<AccountModel | null> {
            return await Promise.resolve(mockAccountModel())
        }
    }
    return new LoadAccountByTokenStub()
}

const makeSut = (role?: string): SutTypes => {
    const loadAccountByTokenStub = mockLoadAccountByTokenStub()
    const sut = new AuthMiddleware(loadAccountByTokenStub, role)
    return {
        sut,
        loadAccountByTokenStub
    }
}

describe('Auth Middleware', () => {
    test('Should Return 403 if LoadAccountByToken return null', async () => {
        const { sut, loadAccountByTokenStub } = makeSut()
        jest.spyOn(loadAccountByTokenStub, 'load').mockReturnValueOnce(
             Promise.resolve(null)
        )
        const httpResponse = await sut.handle(mockRequest())
        expect(httpResponse).toEqual(forbidden(new AcessDeniedError()))
    })

    test('Should Return 403 if no acess-token exists in header', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle({})
        expect(httpResponse).toEqual(forbidden(new AcessDeniedError()))
    })

    test('Should call LoadAccountByToken with correct acess token', async () => {
        const role = 'any_role'
        const { sut, loadAccountByTokenStub } = makeSut(role)
        const loadbyTokenSpy = jest.spyOn(loadAccountByTokenStub, 'load')
        await sut.handle(mockRequest())
        expect(loadbyTokenSpy).toHaveBeenCalledWith('any_token', role)
    })

    test('Should return 500 if LoadAccountByToken throw', async () => {
        const { sut, loadAccountByTokenStub } = makeSut()
        jest.spyOn(loadAccountByTokenStub, 'load').mockImplementationOnce(throwError)
        const httpResponse = await sut.handle(mockRequest())
        expect(httpResponse).toEqual(serverError(new Error()))
    })

    test('Should Return 200 and accountId on success', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle(mockRequest())
        expect(httpResponse).toEqual(ok({ accountId: 'any_id' }))
    })
})
