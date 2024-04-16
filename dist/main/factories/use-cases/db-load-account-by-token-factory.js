"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDbLoadAccountBytoken = void 0;
const db_load_account_by_token_1 = require("@/data/usecases/load-account-by-token/db-load-account-by-token");
const jwt_adapter_1 = require("@/infra/cryptograpy/jwt-adapter/jwt-adapter");
const account_mongo_repository_1 = require("@/infra/db/mongo-db/account-repository/account-mongo-repository");
const env_1 = __importDefault(require("@/main/config/env"));
const makeDbLoadAccountBytoken = () => {
    const loadAccountByTokenRepository = new account_mongo_repository_1.AccountMongoRepository();
    const decryptRepository = new jwt_adapter_1.JwtAdapter(env_1.default.jwtSecret);
    return new db_load_account_by_token_1.DbLoadAccountByToken(loadAccountByTokenRepository, decryptRepository);
};
exports.makeDbLoadAccountBytoken = makeDbLoadAccountBytoken;
//# sourceMappingURL=db-load-account-by-token-factory.js.map