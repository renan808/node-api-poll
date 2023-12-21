import type { Authentication, AuthenticationModel } from '../../../domain/use-cases/authentication'
import type { LoadAccountByEmailRepository } from '../../protocols/LoadAccountByEmailRepository'
export class DbAuthentication implements Authentication {
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
    constructor (LoadAccountByEmailRepository: LoadAccountByEmailRepository) {
        this.loadAccountByEmailRepository = LoadAccountByEmailRepository
    }

   async auth (authentication: AuthenticationModel): Promise<string> {
        await this.loadAccountByEmailRepository.load(authentication.email)
        return ''
    }
}
