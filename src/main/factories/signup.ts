import { SignUpController } from '../../presentation/controllers/signup/signup'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'
import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../infra/cryptograpy/bcrypt-adapter'
import { AccountMongoRepository } from '../../infra/db/mongo-db/account-repository/account'
import { LogControllerDecorator } from '../decorators/log'
import type { Controller } from '../../presentation/protocols'
import { LogMongoRepository } from '../../infra/db/mongo-db/log-repository/log'
export const makeSignUpController = (): Controller => {
    const salt = 12
    const emailValidatorAdapter = new EmailValidatorAdapter()
    const accountMongoRepository = new AccountMongoRepository()
    const bcryptAdapter = new BcryptAdapter(salt)
    const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
    const signUpcontroller = new SignUpController(emailValidatorAdapter, dbAddAccount)
    const logMongoRepository = new LogMongoRepository()
    return new LogControllerDecorator(signUpcontroller, logMongoRepository)
}
