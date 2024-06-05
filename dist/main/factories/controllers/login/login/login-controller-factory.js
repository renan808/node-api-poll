"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeLoginController = void 0;
const login_controller_1 = require("@/presentation/controllers/login/login/login-controller");
const log_controller_decorator_1 = require("@/main/decorators/log-controller-decorator");
const log_mongo_repository_1 = require("@/infra/db/mongo-db/log/log-mongo-repository");
const login_validation_factory_1 = require("./login-validation-factory");
const db_authentication_factory_1 = require("@/main/factories/use-cases/account/db-authentication-factory");
const makeLoginController = () => {
    const dbAuthentication = (0, db_authentication_factory_1.makeDbAuthentication)();
    const loginController = new login_controller_1.LoginController(dbAuthentication, (0, login_validation_factory_1.makeLoginValidation)());
    const logMongoRepository = new log_mongo_repository_1.LogMongoRepository();
    return new log_controller_decorator_1.LogControllerDecorator(loginController, logMongoRepository);
};
exports.makeLoginController = makeLoginController;
//# sourceMappingURL=login-controller-factory.js.map