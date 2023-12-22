import type { Authentication, AuthenticationModel } from '../../../domain/use-cases/authentication'
import type { HashComparer } from '../../protocols/criptography/hash-comparer'
import type { LoadAccountByEmailRepository } from '../../protocols/db/LoadAccountByEmailRepository'
export class DbAuthentication implements Authentication {
    private readonly hashComparer: HashComparer
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
    constructor (LoadAccountByEmailRepository: LoadAccountByEmailRepository, HashComparer: HashComparer) {
        this.loadAccountByEmailRepository = LoadAccountByEmailRepository
        this.hashComparer = HashComparer
    }

   async auth (authentication: AuthenticationModel): Promise<string> {
        const account = await this.loadAccountByEmailRepository.load(authentication.email)
        if (account) {
            await this.hashComparer.compare(authentication.password, account.password)
        }
        return 'unauthorized'
    }
}
