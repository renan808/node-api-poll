import type { AccountModel } from "@/domain/models/account"

export interface LoadAccountByToken {
    load(acessToken: string, role?: string): Promise<AccountModel | null>
}
