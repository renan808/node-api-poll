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

const makeAddAccountRepository = (): AddAccountRepository => {
    class AddAccountRepositoryStub implements AddAccountRepository {
        async add (accountData: AddAccountModel): Promise<AccountModel> {
            const fakeAccount = {
            id: 'valid_id',
            name: 'valid_name',
            email: 'valid_email',
            password: 'hashed_password'
            }
            return await new Promise(resolve => {
                resolve(fakeAccount)
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
        const accountData = {
            name: 'valid_name',
            email: 'valid_email',
            password: 'valid_password'
        }
        await sut.add(accountData)
        expect(encryptSpy).toHaveBeenCalledWith('valid_password')
    })

    test('Should call encrypter with correct password', async () => {
        const { sut, encrypterStub } = makeSut()
        jest.spyOn(encrypterStub, 'encrypt').mockReturnValueOnce(new Promise((resolve, reject) => {
            reject(new Error())
        }))
        const accountData = {
            name: 'valid_name',
            email: 'valid_email',
            password: 'valid_password'
        }
        const promise = sut.add(accountData)
        await expect(promise).rejects.toThrow()
    })

    test('Should call AddAccountRepository with correct values', async () => {
        const { sut, AddAccountRepositoryStub } = makeSut()
        const addSpy = jest.spyOn(AddAccountRepositoryStub, 'add')
        const accountData = {
            name: 'valid_name',
            email: 'valid_email',
            password: 'valid_password'
        }
        await sut.add(accountData)
        expect(addSpy).toHaveBeenCalledWith({
            name: 'valid_name',
            email: 'valid_email',
            password: 'hashed_password'
        })
    })
})
