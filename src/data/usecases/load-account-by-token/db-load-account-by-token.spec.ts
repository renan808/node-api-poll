import type { AccountModel } from "../../../domain/models/account"
import type { Decrypter } from '../../protocols/criptography/decrypter'
import { DbLoadAccountByToken } from './db-load-account-by-token'
import type { LoadAccountByTokenRepository } from "../../protocols/db/account/load-account-by-token-repository"

const makeFakeAccount = (): AccountModel => ({
    id: 'any_id',
    email: 'any_email@email.com',
    name: 'any_name',
    password: 'any_password'
})

const makeLoadAccountByTokenRepositoryStub = (): LoadAccountByTokenRepository => {
    class LoadAccountByTokenRepositoryStub implements LoadAccountByTokenRepository {
        async loadByToken (token: string, role): Promise<AccountModel> {
            return await new Promise(resolve => resolve(makeFakeAccount()))
        }
    }
    return new LoadAccountByTokenRepositoryStub()
}

const makeDecrypter = (): Decrypter => {
    class DecrypterSutb implements Decrypter {
        async decrypt (value: string): Promise<string> {
            return await new Promise(resolve => resolve('any_value'))
        }
    }
    return new DecrypterSutb()
}

interface SutTypes {
    sut: DbLoadAccountByToken
    decrypterStub: Decrypter
    loadAccountByTokenRepositoryStub: LoadAccountByTokenRepository
}

const makeSut = (role?: string): SutTypes => {
    const decrypterStub = makeDecrypter()
    const loadAccountByTokenRepositoryStub = makeLoadAccountByTokenRepositoryStub()
    const sut = new DbLoadAccountByToken(loadAccountByTokenRepositoryStub, decrypterStub)
    return {
        sut,
        decrypterStub,
        loadAccountByTokenRepositoryStub
    }
}

describe('Db LoadAccountByToken Usecase', () => {
    test('Should call LoadBytokenRepository with correct values', async () => {
        const role = 'any_role'
        const { sut, loadAccountByTokenRepositoryStub } = makeSut()
        const loadByTokenSpy = jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken')
        await sut.load('any_token', role)
        expect(loadByTokenSpy).toHaveBeenCalledWith('any_token', role)
    })

    test('Should return null if LoadByTokenRepository return null', async () => {
        const { sut, loadAccountByTokenRepositoryStub } = makeSut()
        jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken').mockReturnValueOnce(
            new Promise(resolve => resolve(null))
        )
        const account = await sut.load('any_token')
        expect(account).toBeNull()
    })

    test('Should call Decrypter with correct values', async () => {
        const { sut, decrypterStub } = makeSut()
        const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')
        await sut.load('any_token')
        expect(decryptSpy).toHaveBeenCalledWith('any_token')
    })

    test('Should throw if Decrypter throws', async () => {
        const { sut, decrypterStub } = makeSut()
        jest.spyOn(decrypterStub, 'decrypt').mockReturnValueOnce(
            new Promise((resolve, reject) => reject(new Error()))
        )
        const promise = sut.load('any_token')
        await expect(promise).rejects.toThrow()
    })

    test('Should return an account on success', async () => {
        const role = 'any_role'
        const { sut } = makeSut()
        const account = await sut.load('any_token', role)
        expect(account).toEqual(makeFakeAccount())
    })
})
