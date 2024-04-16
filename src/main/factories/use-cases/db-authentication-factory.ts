import { DbAuthentication } from '@/data/usecases/authentication/db-authentication'
import { AccountMongoRepository } from '@/infra/db/mongo-db/account-repository/account-mongo-repository'
import { BcryptAdapter } from '@/infra/cryptograpy/bcrypt-adapter/bcrypt-adapter'
import env from '../../config/env'
import { JwtAdapter } from '@/infra/cryptograpy/jwt-adapter/jwt-adapter'
import type { Authentication } from '@/domain/use-cases/authentication'
export const makeDbAuthentication = (): Authentication => {
    const bcryptAdapter = new BcryptAdapter(env.salt)
    const accountMongoRepository = new AccountMongoRepository()
    const jwtAdapter = new JwtAdapter(env.jwtSecret)
    const dbAuthentication = new DbAuthentication(accountMongoRepository, bcryptAdapter, jwtAdapter, accountMongoRepository)
    return dbAuthentication
}
