import type { Controller } from '../../../presentation/protocols'
import { LoginController } from '../../../presentation/controllers/login/login-controller'
import { LogControllerDecorator } from '../../decorators/log-controller-decorator'
import { LogMongoRepository } from '../../../infra/db/mongo-db/log/log-mongo-repository'
import { DbAuthentication } from '../../../data/usecases/authentication/db-authentication'
import { makeLoginValidation } from './login-validation-factory'
import { AccountMongoRepository } from '../../../infra/db/mongo-db/account-repository/account-mongo-repository'
import { BcryptAdapter } from '../../../infra/cryptograpy/bcrypt-adapter/bcrypt-adapter'
import env from '../../config/env'
import { JwtAdapter } from '../../../infra/cryptograpy/jwt-adapter/jwt-adapter'
export const makeLoginController = (): Controller => {
    const bcryptAdapter = new BcryptAdapter(env.salt)
    const accountMongoRepository = new AccountMongoRepository()
    const jwtAdapter = new JwtAdapter(env.jwtSecret)
    const dbAuthentication = new DbAuthentication(accountMongoRepository, bcryptAdapter, jwtAdapter, accountMongoRepository)
    const loginController = new LoginController(dbAuthentication, makeLoginValidation())
    const logMongoRepository = new LogMongoRepository()
    return new LogControllerDecorator(loginController, logMongoRepository)
}
