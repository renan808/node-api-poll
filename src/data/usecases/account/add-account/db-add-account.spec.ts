import type { Hasher, AccountModel, AddAccountRepository, LoadAccountByEmailRepository } from './db-add-account-protocols'
import { mockAccountModel, mockAddAccountParams } from '@/domain/test'
import { DbAddAccount } from './db-add-account'
import { throwError } from '@/domain/test/tests-helpers'
import { mockHasher } from '@/data/test/mock-cryptography'
import { mockAddAccountRepository } from '@/data/test/mock-db-account'

interface sutTypes {
    sut: DbAddAccount
    hasherStub: Hasher
    AddAccountRepositoryStub: AddAccountRepository
    loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
}

const mockLoadAccountByEmailRepositoryStub = (): LoadAccountByEmailRepository => {
    class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
        async loadByEmail (email: string): Promise<AccountModel | null> {
            // eslint-disable-next-line prefer-promise-reject-errors
            return await Promise.resolve(null)
        }
    }
    return new LoadAccountByEmailRepositoryStub()
}

const makeSut = (): sutTypes => {
    const loadAccountByEmailRepositoryStub = mockLoadAccountByEmailRepositoryStub()
    const hasherStub = mockHasher()
    const AddAccountRepositoryStub = mockAddAccountRepository()
    const sut = new DbAddAccount(hasherStub, AddAccountRepositoryStub, loadAccountByEmailRepositoryStub)
    return {
        sut,
        hasherStub,
        AddAccountRepositoryStub,
        loadAccountByEmailRepositoryStub

    }
}

describe('dbAddAccount Usecase', () => {
    test('Should call LoadAccountByEmailRepositoryStub with correct email', async () => {
        const { sut, loadAccountByEmailRepositoryStub } = makeSut()
        const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
        await sut.add(mockAccountModel())
        expect(loadSpy).toHaveBeenCalledWith('any_email@email.com')
    })

    test('Should throw if LoadAccountByEmailRepository throws', async () => {
        const { sut, loadAccountByEmailRepositoryStub } = makeSut()
        jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockImplementationOnce(throwError)
        const promise = sut.add(mockAddAccountParams())
        await expect(promise).rejects.toThrow()
    })

    test('Should throw if LoadAccountByEmailRepository not return null', async () => {
        const { sut, loadAccountByEmailRepositoryStub } = makeSut()
        // eslint-disable-next-line prefer-promise-reject-errors
        jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(Promise.resolve(mockAccountModel()))
        const promise = sut.add(mockAddAccountParams())
        await expect(promise).rejects.toThrow()
    })

    test('Should call Hasher with correct password', async () => {
        const { sut, hasherStub } = makeSut()
        const hasherSpy = jest.spyOn(hasherStub, 'hash')
        await sut.add(mockAddAccountParams())
        expect(hasherSpy).toHaveBeenCalledWith('any_password')
    })

    test('Should throw if HasherStub Throws', async () => {
        const { sut, hasherStub } = makeSut()
        jest.spyOn(hasherStub, 'hash').mockImplementationOnce(throwError)
        const promise = sut.add(mockAddAccountParams())
        await expect(promise).rejects.toThrow()
    })

    test('Should call AddAccountRepository with correct values', async () => {
        const { sut, AddAccountRepositoryStub } = makeSut()
        const addSpy = jest.spyOn(AddAccountRepositoryStub, 'add')
        await sut.add(mockAddAccountParams())
        expect(addSpy).toHaveBeenCalledWith({
            email: 'any_email@email.com',
            name: 'any_name',
            password: 'hashed_password'
        })
    })

    test('Should return an account on success ', async () => {
        const { sut } = makeSut()
        const account = await sut.add(mockAddAccountParams())
        expect(account).toEqual(mockAccountModel())
    })
})
