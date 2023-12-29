import type { Authentication, LoadAccountByEmailRepository, AuthenticationModel, HashComparer, Encrypter, UpdateAcessTokenRepository } from './db-authentication-protocols'

export class DbAuthentication implements Authentication {
    constructor (
        private readonly LoadAccountByEmailRepository: LoadAccountByEmailRepository,
        private readonly HashComparer: HashComparer,
        private readonly Encrypter: Encrypter,
        private readonly UpdateAcessTokenRepository: UpdateAcessTokenRepository) {
    }

   async auth (authentication: AuthenticationModel): Promise<string> {
        const account = await this.LoadAccountByEmailRepository.loadByEmail(authentication.email)
        if (account) {
            const isValid = await this.HashComparer.compare(authentication.password, account.password)
            if (isValid) {
                const acessToken = await this.Encrypter.encrypt(account.id)
                await this.UpdateAcessTokenRepository.updateToken(account.id, acessToken)
                return acessToken
            }
        }
        return 'unauthorized'
    }
}
