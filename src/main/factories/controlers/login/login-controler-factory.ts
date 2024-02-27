import type { Controller } from '../../../../presentation/protocols'
import { LoginController } from '../../../../presentation/controllers/login/login/login-controller'
import { LogControllerDecorator } from '../../../decorators/log-controller-decorator'
import { LogMongoRepository } from '../../../../infra/db/mongo-db/log/log-mongo-repository'
import { makeLoginValidation } from './login-validation-factory'
import { makeDbAuthentication } from '../../use-cases/db-authentication-factory'
export const makeLoginController = (): Controller => {
    const dbAuthentication = makeDbAuthentication()
    const loginController = new LoginController(dbAuthentication, makeLoginValidation())
    const logMongoRepository = new LogMongoRepository()
    return new LogControllerDecorator(loginController, logMongoRepository)
}
