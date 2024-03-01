"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeSignUpController = void 0;
const signup_controller_1 = require("../../../../presentation/controllers/login/signup/signup-controller");
const db_add_account_1 = require("../../../../data/usecases/add-account/db-add-account");
const bcrypt_adapter_1 = require("../../../../infra/cryptograpy/bcrypt-adapter/bcrypt-adapter");
const account_mongo_repository_1 = require("../../../../infra/db/mongo-db/account-repository/account-mongo-repository");
const log_controller_decorator_1 = require("../../../decorators/log-controller-decorator");
const log_mongo_repository_1 = require("../../../../infra/db/mongo-db/log/log-mongo-repository");
const signup_validation_factory_1 = require("./signup-validation-factory");
const db_authentication_factory_1 = require(".././../use-cases/db-authentication-factory");
const makeSignUpController = () => {
    const salt = 12;
    const accountMongoRepository = new account_mongo_repository_1.AccountMongoRepository();
    const bcryptAdapter = new bcrypt_adapter_1.BcryptAdapter(salt);
    const dbAddAccount = new db_add_account_1.DbAddAccount(bcryptAdapter, accountMongoRepository, accountMongoRepository);
    const signUpcontroller = new signup_controller_1.SignUpController((0, signup_validation_factory_1.makeSignUpValidation)(), dbAddAccount, (0, db_authentication_factory_1.makeDbAuthentication)());
    const logMongoRepository = new log_mongo_repository_1.LogMongoRepository();
    return new log_controller_decorator_1.LogControllerDecorator(signUpcontroller, logMongoRepository);
};
exports.makeSignUpController = makeSignUpController;
//# sourceMappingURL=signup-factory.js.map