import { AcessDeniedError } from '../errors/index'
import { forbidden, ok, serverError } from '../helpers/http/http-helper'
import { AuthMiddleware } from './auth-middleware'
import type { LoadAccountByToken } from '@/domain/use-cases/account/load-account-by-token'
import type { AccountModel } from '@/domain/models/account'
import type { httpRequest } from '../protocols'

interface SutTypes {
    sut: AuthMiddleware
    loadAccountByTokenStub: LoadAccountByToken
}
const makeFakeAccount = (): AccountModel => ({
    id: 'any_id',
    email: 'any_email@email.com',
    name: 'any_name',
    password: 'any_password'
})

const makeFakeRequest = (): httpRequest => ({
    headers: {
        'x-acess-token': 'any_token'
    }
})

const makeLoadAccountByTokenStub = (): LoadAccountByToken => {
    class LoadAccountByTokenStub implements LoadAccountByToken {
        async load (acessToken: string, role?: string): Promise<AccountModel | null> {
            return await new Promise(resolve => resolve(makeFakeAccount()))
        }
    }
    return new LoadAccountByTokenStub()
}

const makeSut = (role?: string): SutTypes => {
    const loadAccountByTokenStub = makeLoadAccountByTokenStub()
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
             new Promise(resolve => resolve(null))
        )
        const httpResponse = await sut.handle(makeFakeRequest())
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
        await sut.handle(makeFakeRequest())
        expect(loadbyTokenSpy).toHaveBeenCalledWith('any_token', role)
    })

    test('Should return 500 if LoadAccountByToken throw', async () => {
        const { sut, loadAccountByTokenStub } = makeSut()
        jest.spyOn(loadAccountByTokenStub, 'load').mockReturnValueOnce(
            new Promise((resolve, reject) => reject(new Error()
        )))
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(serverError(new Error()))
    })

    test('Should Return 200 and accountId on success', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(ok({ accountId: 'any_id' }))
    })
})
