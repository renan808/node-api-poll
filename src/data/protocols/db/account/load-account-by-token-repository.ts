import type { AccountModel } from "../../../usecases/add-account/db-add-account-protocols"

export interface LoadAccountByTokenRepository {
    loadByToken(acessToken: string, role?: string): Promise<AccountModel | null>
}
