import type { AccountModel, LoadAccountByEmailRepository, AuthenticationModel, HashComparer, Encrypter, UpdateAcessTokenRepository } from './db-authentication-protocols'
import { DbAuthentication } from './db-authentication'
import { mockAccountModel } from '@/domain/tests'
import { throwError } from '@/domain/tests/tests-helpers'
import { mockEncrypter, mockHashComparer } from '@/domain/tests/mock-cryptography'

const makeFakeAuthentication = (): AuthenticationModel => ({
    email: 'any_email@email.com',
    password: 'any_password'
})

const makeLoadAccountByEmailRepositoryStub = (): LoadAccountByEmailRepository => {
    class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
        async loadByEmail (email: string): Promise<AccountModel> {
            const account = mockAccountModel()
            account.password = 'hashed_password'
            return await new Promise(resolve => resolve(account))
        }
    }
    return new LoadAccountByEmailRepositoryStub()
}

const makeUpdateAcessTokenRepository = (): UpdateAcessTokenRepository => {
    class UpdateAcessTokenRepositoryStub implements UpdateAcessTokenRepository {
        async updateToken (id: string, token: string): Promise<void> {
            return await new Promise(resolve => resolve())
        }
    }
    return new UpdateAcessTokenRepositoryStub()
}

interface SutTypes {
    sut: DbAuthentication
    loadAccountByEmailRepository: LoadAccountByEmailRepository
    hashComparerStub: HashComparer
    encrypterStub: Encrypter
    UpdateAcessTokenRepositoryStub: UpdateAcessTokenRepository
}
const makeSut = (): SutTypes => {
    const UpdateAcessTokenRepositoryStub = makeUpdateAcessTokenRepository()
    const loadAccountByEmailRepository = makeLoadAccountByEmailRepositoryStub()
    const hashComparerStub = mockHashComparer()
    const encrypterStub = mockEncrypter()
    const sut = new DbAuthentication(loadAccountByEmailRepository,
        hashComparerStub,
        encrypterStub,
        UpdateAcessTokenRepositoryStub)
    return {
        sut,
        loadAccountByEmailRepository,
        hashComparerStub,
        encrypterStub,
        UpdateAcessTokenRepositoryStub
    }
}

describe('DbAuthentication Usecase', () => {
    test('Should call LoadAccountByEmailRepository with correct email', async () => {
        const { sut, loadAccountByEmailRepository } = makeSut()
        const loadSpy = jest.spyOn(loadAccountByEmailRepository, 'loadByEmail')
        await sut.auth(makeFakeAuthentication())
        expect(loadSpy).toHaveBeenCalledWith('any_email@email.com')
    })

    test('Should throw if LoadAccountByEmailRepository throws', async () => {
        const { sut, loadAccountByEmailRepository } = makeSut()
        jest.spyOn(loadAccountByEmailRepository, 'loadByEmail').mockImplementationOnce(throwError)
        const promise = sut.auth(makeFakeAuthentication())
        await expect(promise).rejects.toThrow()
    })

    test('Should return null if LoadAccountByEmailRepository returns null', async () => {
        const { sut, loadAccountByEmailRepository } = makeSut()
        jest.spyOn(loadAccountByEmailRepository, 'loadByEmail').mockReturnValueOnce(
            // eslint-disable-next-line prefer-promise-reject-errors
            new Promise((resolve, reject) => reject(null))
        )
        const promise = sut.auth(makeFakeAuthentication())
        await expect(promise).rejects.toBeNull()
    })

    test('Should call HashComparer with correct password', async () => {
        const { sut, hashComparerStub } = makeSut()
        const spyComparer = jest.spyOn(hashComparerStub, 'compare')
        await sut.auth(makeFakeAuthentication())
        expect(spyComparer).toHaveBeenCalledWith('any_password', 'hashed_password')
    })

    test('Should return false if HashComparer return false', async () => {
        const { sut, hashComparerStub } = makeSut()
        jest.spyOn(hashComparerStub, 'compare').mockReturnValueOnce(
            new Promise(resolve => resolve(false))
        )
        const acessToken = sut.auth(makeFakeAuthentication())
        await expect(acessToken).resolves.toBe('unauthorized')
    })

    test('Should throw if HashComparer Throws', async () => {
        const { sut, hashComparerStub } = makeSut()
        jest.spyOn(hashComparerStub, 'compare').mockImplementationOnce(throwError)
        const promise = sut.auth(makeFakeAuthentication())
        await expect(promise).rejects.toThrow()
    })

    test('Should call Encrypter with correct id', async () => {
        const { sut, encrypterStub } = makeSut()
        const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
        await sut.auth(makeFakeAuthentication())
        expect(encryptSpy).toHaveBeenCalledWith('any_id')
    })

    test('Should throw if Encrypter throws', async () => {
        const { sut, encrypterStub } = makeSut()
        jest.spyOn(encrypterStub, 'encrypt').mockImplementationOnce(throwError)
        const promise = sut.auth(makeFakeAuthentication())
        await expect(promise).rejects.toThrow()
    })

    test('Should return a token on success', async () => {
        const { sut } = makeSut()
        const acessToken = await sut.auth(makeFakeAuthentication())
        expect(acessToken).toBe('any_token')
    })

    test('Should call UpdateAcessTokenRepository with correct values', async () => {
        const { sut, UpdateAcessTokenRepositoryStub } = makeSut()
        const updateSpy = jest.spyOn(UpdateAcessTokenRepositoryStub, 'updateToken')
        await sut.auth(makeFakeAuthentication())
        expect(updateSpy).toHaveBeenCalledWith('any_id', 'any_token')
    })

    test('Should throw if UpdateAcessTokenRepository throws', async () => {
        const { sut, UpdateAcessTokenRepositoryStub } = makeSut()
        jest.spyOn(UpdateAcessTokenRepositoryStub, 'updateToken').mockImplementationOnce(throwError)
        const promise = sut.auth(makeFakeAuthentication())
        await expect(promise).rejects.toThrow()
    })

    test('Should update token on UpdateAcessToken succeeds', async () => {
        const { sut } = makeSut()
        const res = await sut.auth(makeFakeAuthentication())
        console.log(res)
        expect(res).toBeTruthy()
    })
})