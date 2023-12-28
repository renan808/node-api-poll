import type { Authentication, LoadAccountByEmailRepository, AuthenticationModel, HashComparer, Encrypter, UpdateAcessTokenRepository } from './db-authentication-protocols'

export class DbAuthentication implements Authentication {
    private readonly hashComparer: HashComparer
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
    private readonly encrypter: Encrypter
    private readonly updateAcessTokenRepository: UpdateAcessTokenRepository
    constructor (LoadAccountByEmailRepository: LoadAccountByEmailRepository,
        HashComparer: HashComparer,
        Encrypter: Encrypter,
        UpdateAcessTokenRepository: UpdateAcessTokenRepository) {
        this.loadAccountByEmailRepository = LoadAccountByEmailRepository
        this.hashComparer = HashComparer
        this.encrypter = Encrypter
        this.updateAcessTokenRepository = UpdateAcessTokenRepository
    }

   async auth (authentication: AuthenticationModel): Promise<string> {
        const account = await this.loadAccountByEmailRepository.loadByEmail(authentication.email)
        if (account) {
            const isValid = await this.hashComparer.compare(authentication.password, account.password)
            if (isValid) {
                const acessToken = await this.encrypter.encrypt(account.id)
                await this.updateAcessTokenRepository.updateToken(account.id, acessToken)
                return acessToken
            }
        }
        return 'unauthorized'
    }
}
