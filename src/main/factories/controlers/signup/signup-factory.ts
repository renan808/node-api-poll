import { SignUpController } from '../../../../presentation/controllers/signup/signup-controller'
import { DbAddAccount } from '../../../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../../../infra/cryptograpy/bcrypt-adapter/bcrypt-adapter'
import { AccountMongoRepository } from '../../../../infra/db/mongo-db/account-repository/account-mongo-repository'
import { LogControllerDecorator } from '../../../decorators/log-controller-decorator'
import type { Controller } from '../../../../presentation/protocols'
import { LogMongoRepository } from '../../../../infra/db/mongo-db/log/log-mongo-repository'
import { makeSignUpValidation } from './signup-validation-factory'
import { makeDbAuthentication } from '.././../use-cases/db-authentication-factory'
export const makeSignUpController = (): Controller => {
    const salt = 12
    const accountMongoRepository = new AccountMongoRepository()
    const bcryptAdapter = new BcryptAdapter(salt)
    const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
    const signUpcontroller = new SignUpController(makeSignUpValidation(), dbAddAccount, makeDbAuthentication())
    const logMongoRepository = new LogMongoRepository()
    return new LogControllerDecorator(signUpcontroller, logMongoRepository)
}
