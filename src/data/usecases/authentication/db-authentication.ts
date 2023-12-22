import type { Authentication, AuthenticationModel } from '../../../domain/use-cases/authentication'
import type { HashComparer } from '../../protocols/criptography/hash-comparer'
import type { TokenGenerator } from '../../protocols/criptography/token-generator'
import type { LoadAccountByEmailRepository } from '../../protocols/db/LoadAccountByEmailRepository'
import type { UpdateAcessTokenRepository } from '../../protocols/db/updateAcessTokenRepository'
export class DbAuthentication implements Authentication {
    private readonly hashComparer: HashComparer
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
    private readonly tokenGenerator: TokenGenerator
    private readonly updateAcessTokenRepository: UpdateAcessTokenRepository
    constructor (LoadAccountByEmailRepository: LoadAccountByEmailRepository,
        HashComparer: HashComparer,
        TokenGenerator: TokenGenerator,
        UpdateAcessTokenRepository: UpdateAcessTokenRepository) {
        this.loadAccountByEmailRepository = LoadAccountByEmailRepository
        this.hashComparer = HashComparer
        this.tokenGenerator = TokenGenerator
        this.updateAcessTokenRepository = UpdateAcessTokenRepository
    }

   async auth (authentication: AuthenticationModel): Promise<string> {
        const account = await this.loadAccountByEmailRepository.load(authentication.email)
        if (account) {
            const isValid = await this.hashComparer.compare(authentication.password, account.password)
            if (isValid) {
                const acessToken = await this.tokenGenerator.generate(account.id)
                await this.updateAcessTokenRepository.update(account.id, acessToken)
                return acessToken
            }
        }
        return 'unauthorized'
    }
}
