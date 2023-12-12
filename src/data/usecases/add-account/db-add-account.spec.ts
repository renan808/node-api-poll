import type { Encrypter, AddAccountModel, AccountModel, AddAccountRepository } from './db-add-account-protocols'
import { DbAddAccount } from './db-add-account'
interface sutTypes {
    sut: DbAddAccount
    encrypterStub: Encrypter
    AddAccountRepositoryStub: AddAccountRepository
}

const makeEncrypter = (): Encrypter => {
    class EncrypterStub implements Encrypter {
        async encrypt (value: string): Promise<string> {
            return await new Promise(resolve => {
                resolve('hashed_password')
            })
        }
    }
    return new EncrypterStub()
}

const makeAccountData = (): AddAccountModel => ({
    name: 'valid_name',
    email: 'valid_email',
    password: 'valid_password'
})

const makeFakeAccount = (): AccountModel => ({
    id: 'valid_id',
    email: 'valid_email@email.com',
    name: 'valid_name',
    password: 'hashed_password'
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

const makeSut = (): sutTypes => {
    const encrypterStub = makeEncrypter()
    const AddAccountRepositoryStub = makeAddAccountRepository()
    const sut = new DbAddAccount(encrypterStub, AddAccountRepositoryStub)
    return {
        sut,
        encrypterStub,
        AddAccountRepositoryStub
    }
}

describe('dbAddAccountUsecase', () => {
    test('Should call encrypter with correct password', async () => {
        const { sut, encrypterStub } = makeSut()
        const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
        await sut.add(makeAccountData())
        expect(encryptSpy).toHaveBeenCalledWith('valid_password')
    })

    test('Should throw if Encrypter throws ', async () => {
        const { sut, encrypterStub } = makeSut()
        jest.spyOn(encrypterStub, 'encrypt').mockReturnValueOnce(new Promise((resolve, reject) => {
            reject(new Error())
        }))
        const promise = sut.add(makeAccountData())
        await expect(promise).rejects.toThrow()
    })

    test('Should call AddAccountRepository with correct values', async () => {
        const { sut, AddAccountRepositoryStub } = makeSut()
        const addSpy = jest.spyOn(AddAccountRepositoryStub, 'add')
        await sut.add(makeAccountData())
        expect(addSpy).toHaveBeenCalledWith({
            name: 'valid_name',
            email: 'valid_email',
            password: 'hashed_password'
        })
    })

    test('Should throw if Encrypter throws ', async () => {
        const { sut, AddAccountRepositoryStub } = makeSut()
        jest.spyOn(AddAccountRepositoryStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => {
            reject(new Error())
        }))
        const promise = sut.add(makeAccountData())
        await expect(promise).rejects.toThrow()
    })

    test('Should return an account on success ', async () => {
        const { sut } = makeSut()
        const account = await sut.add(makeAccountData())
        expect(account).toEqual(makeFakeAccount())
    })
})
