import type { Hasher, AddAccountModel, AccountModel, AddAccountRepository, LoadAccountByEmailRepository } from './db-add-account-protocols'
import { DbAddAccount } from './db-add-account'
interface sutTypes {
    sut: DbAddAccount
    hasherStub: Hasher
    AddAccountRepositoryStub: AddAccountRepository
    loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
}

const makeHasher = (): Hasher => {
    class HasherStub implements Hasher {
        async hash (value: string): Promise<string> {
            return await new Promise(resolve => {
                resolve('hashed_password')
            })
        }
    }
    return new HasherStub()
}

const makeAccountData = (): AddAccountModel => ({
    name: 'any_name',
    email: 'any_email@email.com',
    password: 'any_password'
})

const makeFakeAccount = (): AccountModel => ({
    id: 'any_id',
    email: 'any_email@email.com',
    name: 'any_name',
    password: 'any_password'
})

const makeAddAccountRepository = (): AddAccountRepository => {
    class AddAccountRepositoryStub implements AddAccountRepository {
        async add (accountData: AddAccountModel): Promise<AccountModel> {
            return await new Promise(resolve => {
                resolve(makeFakeAccount())
            })
        }
    }
    return new AddAccountRepositoryStub()
}

const makeLoadAccountByEmailRepositoryStub = (): LoadAccountByEmailRepository => {
    class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
        async loadByEmail (email: string): Promise<AccountModel | null> {
            // eslint-disable-next-line prefer-promise-reject-errors
            return await new Promise(resolve => resolve(null))
        }
    }
    return new LoadAccountByEmailRepositoryStub()
}

const makeSut = (): sutTypes => {
    const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepositoryStub()
    const hasherStub = makeHasher()
    const AddAccountRepositoryStub = makeAddAccountRepository()
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
        await sut.add(makeFakeAccount())
        expect(loadSpy).toHaveBeenCalledWith('any_email@email.com')
    })

    test('Should throw if LoadAccountByEmailRepository throws', async () => {
        const { sut, loadAccountByEmailRepositoryStub } = makeSut()
        jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
        const promise = sut.add(makeAccountData())
        await expect(promise).rejects.toThrow()
    })

    test('Should throw if LoadAccountByEmailRepository not return null', async () => {
        const { sut, loadAccountByEmailRepositoryStub } = makeSut()
        // eslint-disable-next-line prefer-promise-reject-errors
        jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(new Promise((resolve, reject) => resolve(makeFakeAccount())))
        const promise = sut.add(makeAccountData())
        await expect(promise).rejects.toThrow()
    })

    test('Should call Hasher with correct password', async () => {
        const { sut, hasherStub } = makeSut()
        const hasherSpy = jest.spyOn(hasherStub, 'hash')
        await sut.add(makeAccountData())
        expect(hasherSpy).toHaveBeenCalledWith('any_password')
    })

    test('Should call AddAccountRepository with correct values', async () => {
        const { sut, AddAccountRepositoryStub } = makeSut()
        const addSpy = jest.spyOn(AddAccountRepositoryStub, 'add')
        await sut.add(makeAccountData())
        expect(addSpy).toHaveBeenCalledWith({
            email: 'any_email@email.com',
            name: 'any_name',
            password: 'hashed_password'
        })
    })

    test('Should return an account on success ', async () => {
        const { sut } = makeSut()
        const account = await sut.add(makeAccountData())
        expect(account).toEqual(makeFakeAccount())
    })
})
