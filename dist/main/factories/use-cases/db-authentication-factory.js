"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDbAuthentication = void 0;
const db_authentication_1 = require("../../../data/usecases/authentication/db-authentication");
const account_mongo_repository_1 = require("../../../infra/db/mongo-db/account-repository/account-mongo-repository");
const bcrypt_adapter_1 = require("../../../infra/cryptograpy/bcrypt-adapter/bcrypt-adapter");
const env_1 = __importDefault(require("../../config/env"));
const jwt_adapter_1 = require("../../../infra/cryptograpy/jwt-adapter/jwt-adapter");
const makeDbAuthentication = () => {
    const bcryptAdapter = new bcrypt_adapter_1.BcryptAdapter(env_1.default.salt);
    const accountMongoRepository = new account_mongo_repository_1.AccountMongoRepository();
    const jwtAdapter = new jwt_adapter_1.JwtAdapter(env_1.default.jwtSecret);
    const dbAuthentication = new db_authentication_1.DbAuthentication(accountMongoRepository, bcryptAdapter, jwtAdapter, accountMongoRepository);
    return dbAuthentication;
};
exports.makeDbAuthentication = makeDbAuthentication;
//# sourceMappingURL=db-authentication-factory.js.map