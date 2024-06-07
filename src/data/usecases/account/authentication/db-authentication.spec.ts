import type { LoadAccountByEmailRepository, HashComparer, Encrypter, UpdateAcessTokenRepository } from './db-authentication-protocols'
import { DbAuthentication } from './db-authentication'
import { throwError } from '@/domain/test/tests-helpers'
import { mockEncrypter, mockAuthentication, mockHashComparer, mockUpdateAcessTokenRepository } from '@/data/test/mock-cryptography'
import { mockLoadAccountByEmailRepository } from '@/data/test/mock-db-account'

interface SutTypes {
    sut: DbAuthentication
    loadAccountByEmailRepository: LoadAccountByEmailRepository
    hashComparerStub: HashComparer
    encrypterStub: Encrypter
    UpdateAcessTokenRepositoryStub: UpdateAcessTokenRepository
}
const makeSut = (): SutTypes => {
    const UpdateAcessTokenRepositoryStub = mockUpdateAcessTokenRepository()
    const loadAccountByEmailRepository = mockLoadAccountByEmailRepository()
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
        await sut.auth(mockAuthentication())
        expect(loadSpy).toHaveBeenCalledWith('any_email@email.com')
    })

    test('Should throw if LoadAccountByEmailRepository throws', async () => {
        const { sut, loadAccountByEmailRepository } = makeSut()
        jest.spyOn(loadAccountByEmailRepository, 'loadByEmail').mockImplementationOnce(throwError)
        const promise = sut.auth(mockAuthentication())
        await expect(promise).rejects.toThrow()
    })

    test('Should return null if LoadAccountByEmailRepository returns null', async () => {
        const { sut, loadAccountByEmailRepository } = makeSut()
        jest.spyOn(loadAccountByEmailRepository, 'loadByEmail').mockReturnValueOnce(
            // eslint-disable-next-line prefer-promise-reject-errors
            new Promise((resolve, reject) => reject(null))
        )
        const promise = sut.auth(mockAuthentication())
        await expect(promise).rejects.toBeNull()
    })

    test('Should call HashComparer with correct password', async () => {
        const { sut, hashComparerStub } = makeSut()
        const spyCompare = jest.spyOn(hashComparerStub, 'compare')
        await sut.auth(mockAuthentication())
        expect(spyCompare).toHaveBeenCalledWith('any_password', 'hashed_password')
    })

    test('Should return false if HashComparer return false', async () => {
        const { sut, hashComparerStub } = makeSut()
        jest.spyOn(hashComparerStub, 'compare').mockReturnValueOnce(
            new Promise(resolve => resolve(false))
        )
        const acessToken = sut.auth(mockAuthentication())
        await expect(acessToken).resolves.toBe('unauthorized')
    })

    test('Should throw if HashComparer Throws', async () => {
        const { sut, hashComparerStub } = makeSut()
        jest.spyOn(hashComparerStub, 'compare').mockImplementationOnce(throwError)
        const promise = sut.auth(mockAuthentication())
        await expect(promise).rejects.toThrow()
    })

    test('Should call Encrypter with correct id', async () => {
        const { sut, encrypterStub } = makeSut()
        const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
        await sut.auth(mockAuthentication())
        expect(encryptSpy).toHaveBeenCalledWith('any_id')
    })

    test('Should throw if Encrypter throws', async () => {
        const { sut, encrypterStub } = makeSut()
        jest.spyOn(encrypterStub, 'encrypt').mockImplementationOnce(throwError)
        const promise = sut.auth(mockAuthentication())
        await expect(promise).rejects.toThrow()
    })

    test('Should return a token on success', async () => {
        const { sut } = makeSut()
        const acessToken = await sut.auth(mockAuthentication())
        expect(acessToken).toBe('any_token')
    })

    test('Should call UpdateAcessTokenRepository with correct values', async () => {
        const { sut, UpdateAcessTokenRepositoryStub } = makeSut()
        const updateSpy = jest.spyOn(UpdateAcessTokenRepositoryStub, 'updateToken')
        await sut.auth(mockAuthentication())
        expect(updateSpy).toHaveBeenCalledWith('any_id', 'any_token')
    })

    test('Should throw if UpdateAcessTokenRepository throws', async () => {
        const { sut, UpdateAcessTokenRepositoryStub } = makeSut()
        jest.spyOn(UpdateAcessTokenRepositoryStub, 'updateToken').mockImplementationOnce(throwError)
        const promise = sut.auth(mockAuthentication())
        await expect(promise).rejects.toThrow()
    })

    test('Should update token on UpdateAcessToken succeeds', async () => {
        const { sut } = makeSut()
        const res = await sut.auth(mockAuthentication())
        console.log(res)
        expect(res).toBeTruthy()
    })
})
