import type { Decrypter } from '@/data/protocols/criptography/decrypter'
import { DbLoadAccountByToken } from './db-load-account-by-token'
import type { LoadAccountByTokenRepository } from "data/protocols/db/account/load-account-by-token-repository"
import { mockAccountModel } from "@/domain/test"
import { throwError } from "@/domain/test/tests-helpers"
import { mockDecrypter } from "@/data/test/mock-cryptography"
import { mockLoadAccountByTokenRepository } from '@/data/test/mock-db-account'

interface SutTypes {
    sut: DbLoadAccountByToken
    decrypterStub: Decrypter
    loadAccountByTokenRepositoryStub: LoadAccountByTokenRepository
}

const makeSut = (role?: string): SutTypes => {
    const decrypterStub = mockDecrypter()
    const loadAccountByTokenRepositoryStub = mockLoadAccountByTokenRepository()
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
            Promise.resolve(null)
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
        jest.spyOn(decrypterStub, 'decrypt').mockImplementationOnce(throwError)
        const promise = sut.load('any_token')
        await expect(promise).rejects.toThrow()
    })

    test('Should return an account on success', async () => {
        const role = 'any_role'
        const { sut } = makeSut()
        const account = await sut.load('any_token', role)
        expect(account).toEqual(mockAccountModel())
    })
})