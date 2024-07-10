import type { AddAccountRepository } from "../protocols/db/account/add-account-repository"
import type { AddAccountParams, AccountModel, LoadAccountByEmailRepository } from "../use-cases/account/add-account/db-add-account-protocols"
import { mockAccountModel } from "@/domain/test"
import type { LoadAccountByTokenRepository } from "../protocols/db/account/load-account-by-token-repository"

export const mockAddAccountRepository = (): AddAccountRepository => {
    class AddAccountRepositoryStub implements AddAccountRepository {
        async add (accountData: AddAccountParams): Promise<AccountModel> {
            return await new Promise(resolve => {
                resolve(mockAccountModel())
            })
        }
    }
    return new AddAccountRepositoryStub()
}

export const mockLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
    class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
        async loadByEmail (email: string): Promise<AccountModel | null> {
            // eslint-disable-next-line prefer-promise-reject-errors
            return await Promise.resolve(mockAccountModel())
        }
    }
    return new LoadAccountByEmailRepositoryStub()
}

export const mockLoadAccountByTokenRepository = (): LoadAccountByTokenRepository => {
    class LoadAccountByTokenRepositoryStub implements LoadAccountByTokenRepository {
        async loadByToken (token: string, role): Promise<AccountModel> {
            return await Promise.resolve(mockAccountModel())
        }
    }
    return new LoadAccountByTokenRepositoryStub()
}
