import type { LoadAccountByToken } from "@/domain/use-cases/account/load-account-by-token"
import type { Decrypter } from "@/data/protocols/criptography/decrypter"
import type { AccountModel } from "../add-account/db-add-account-protocols"
import type { LoadAccountByTokenRepository } from "../../../protocols/db/account/load-account-by-token-repository"

export class DbLoadAccountByToken implements LoadAccountByToken {
    constructor (
        private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository,
        private readonly decrypter: Decrypter
    ) {}

    async load (acessToken: string, role?: string): Promise<AccountModel | null> {
        const token = await this.decrypter.decrypt(acessToken)
        if (token) {
            const account = await this.loadAccountByTokenRepository.loadByToken(acessToken, role)
            if (account) {
                return account
            }
        }
        return null
    }
}
