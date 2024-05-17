import type { AddAccountModel } from '@/domain/use-cases/account/add-account'
import type { AccountModel } from '@/domain/models/account'
export interface AddAccountRepository {
    add (accountData: AddAccountModel): Promise<AccountModel>
}
