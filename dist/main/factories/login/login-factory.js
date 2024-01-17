"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeLoginController = void 0;
const login_controller_1 = require("../../../presentation/controllers/login/login-controller");
const log_controller_decorator_1 = require("../../decorators/log-controller-decorator");
const log_mongo_repository_1 = require("../../../infra/db/mongo-db/log/log-mongo-repository");
const db_authentication_1 = require("../../../data/usecases/authentication/db-authentication");
const login_validation_factory_1 = require("./login-validation-factory");
const account_mongo_repository_1 = require("../../../infra/db/mongo-db/account-repository/account-mongo-repository");
const bcrypt_adapter_1 = require("../../../infra/cryptograpy/bcrypt-adapter/bcrypt-adapter");
const env_1 = __importDefault(require("../../config/env"));
const jwt_adapter_1 = require("../../../infra/cryptograpy/jwt-adapter/jwt-adapter");
const makeLoginController = () => {
    const bcryptAdapter = new bcrypt_adapter_1.BcryptAdapter(env_1.default.salt);
    const accountMongoRepository = new account_mongo_repository_1.AccountMongoRepository();
    const jwtAdapter = new jwt_adapter_1.JwtAdapter(env_1.default.jwtSecret);
    const dbAuthentication = new db_authentication_1.DbAuthentication(accountMongoRepository, bcryptAdapter, jwtAdapter, accountMongoRepository);
    const loginController = new login_controller_1.LoginController(dbAuthentication, (0, login_validation_factory_1.makeLoginValidation)());
    const logMongoRepository = new log_mongo_repository_1.LogMongoRepository();
    return new log_controller_decorator_1.LogControllerDecorator(loginController, logMongoRepository);
};
exports.makeLoginController = makeLoginController;
