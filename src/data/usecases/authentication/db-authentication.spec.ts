import type { AccountModel } from '../add-account/db-add-account-protocols'
import type { LoadAccountByEmailRepository } from '../../protocols/db/LoadAccountByEmailRepository'
import { DbAuthentication } from './db-authentication'
import type { AuthenticationModel } from '../../../domain/use-cases/authentication'
import type { HashComparer } from '../../protocols/criptography/hash-comparer'
import type { TokenGenerator } from '../../protocols/criptography/token-generator'
import type { UpdateAcessTokenRepository } from '../../protocols/db/updateAcessTokenRepository'

const makeFakeAuthentication = (): AuthenticationModel => ({
    email: 'any_email@email.com',
    password: 'any_password'
})

const makeFakeAccount = (): AccountModel => ({
    id: 'any_id',
    name: 'any_name',
    email: 'any_email@email.com',
    password: 'hashed_password'
})
const makeLoadAccountByEmailRepositoryStub = (): LoadAccountByEmailRepository => {
    class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
        async load (email: string): Promise<AccountModel> {
            const account = makeFakeAccount()
            return await new Promise(resolve => resolve(account))
        }
    }
    return new LoadAccountByEmailRepositoryStub()
}

const makeHashComparerStub = (): HashComparer => {
    class HashComparerStub implements HashComparer {
        async compare (password: string, hash: string): Promise<boolean> {
            return await new Promise(resolve => resolve(true))
        }
    }
    return new HashComparerStub()
}

const makeTokenGenerator = (): TokenGenerator => {
    class TokenGeneratorStub implements TokenGenerator {
        async generate (id: string): Promise<string> {
            return await new Promise(resolve => resolve('any_token'))
        }
    }
    return new TokenGeneratorStub()
}

const makeUpdateAcessTokenRepository = (): UpdateAcessTokenRepository => {
    class UpdateAcessTokenRepositoryStub implements UpdateAcessTokenRepository {
        async update (id: string, token: string): Promise<void> {
            return await new Promise(resolve => resolve())
        }
    }
    return new UpdateAcessTokenRepositoryStub()
}

interface SutTypes {
    sut: DbAuthentication
    loadAccountByEmailRepository: LoadAccountByEmailRepository
    hashComparerStub: HashComparer
    tokenGeneratorStub: TokenGenerator
    upDateAcessTokenRepositoryStub: UpdateAcessTokenRepository
}
const makeSut = (): SutTypes => {
    const upDateAcessTokenRepositoryStub = makeUpdateAcessTokenRepository()
    const loadAccountByEmailRepository = makeLoadAccountByEmailRepositoryStub()
    const hashComparerStub = makeHashComparerStub()
    const tokenGeneratorStub = makeTokenGenerator()
    const sut = new DbAuthentication(loadAccountByEmailRepository,
        hashComparerStub,
        tokenGeneratorStub,
        upDateAcessTokenRepositoryStub)
    return {
        sut,
        loadAccountByEmailRepository,
        hashComparerStub,
        tokenGeneratorStub,
        upDateAcessTokenRepositoryStub
    }
}

describe('DbAuthentication Usecase', () => {
    test('Should call LoadAccountByEmailRepository with correct email', async () => {
        const { sut, loadAccountByEmailRepository } = makeSut()
        const loadSpy = jest.spyOn(loadAccountByEmailRepository, 'load')
        await sut.auth(makeFakeAuthentication())
        expect(loadSpy).toHaveBeenCalledWith('any_email@email.com')
    })

    test('Should throw if LoadAccountByEmailRepository throws', async () => {
        const { sut, loadAccountByEmailRepository } = makeSut()
        jest.spyOn(loadAccountByEmailRepository, 'load').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
        const promise = sut.auth(makeFakeAuthentication())
        await expect(promise).rejects.toThrow()
    })

    test('Should return null if LoadAccountByEmailRepository returns null', async () => {
        const { sut, loadAccountByEmailRepository } = makeSut()
        jest.spyOn(loadAccountByEmailRepository, 'load').mockReturnValueOnce(
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
        jest.spyOn(hashComparerStub, 'compare').mockReturnValueOnce(
            new Promise((resolve, reject) => reject(new Error()))
        )
        const promise = sut.auth(makeFakeAuthentication())
        await expect(promise).rejects.toThrow()
    })

    test('Should call tokenGenerator with correct id', async () => {
        const { sut, tokenGeneratorStub } = makeSut()
        const generateSpy = jest.spyOn(tokenGeneratorStub, 'generate')
        await sut.auth(makeFakeAuthentication())
        expect(generateSpy).toHaveBeenCalledWith('any_id')
    })

    test('Should throw if tokenGenerator throws', async () => {
        const { sut, tokenGeneratorStub } = makeSut()
        jest.spyOn(tokenGeneratorStub, 'generate').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
        const promise = sut.auth(makeFakeAuthentication())
        await expect(promise).rejects.toThrow()
    })

    test('Should call tokenGenerator with correct value', async () => {
        const { sut } = makeSut()
        const acessToken = await sut.auth(makeFakeAuthentication())
        expect(acessToken).toBe('any_token')
    })

    test('Should call UpdateAcessTokenRepository with correct values', async () => {
        const { sut, upDateAcessTokenRepositoryStub } = makeSut()
        const updateSpy = jest.spyOn(upDateAcessTokenRepositoryStub, 'update')
        await sut.auth(makeFakeAuthentication())
        expect(updateSpy).toHaveBeenCalledWith('any_id', 'any_token')
    })
})
