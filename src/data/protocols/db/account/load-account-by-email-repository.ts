import type { AccountModel } from '@/data/use-cases/account/add-account/db-add-account-protocols'

export interface LoadAccountByEmailRepository {
    loadByEmail (email: string): Promise<AccountModel | null>
}
