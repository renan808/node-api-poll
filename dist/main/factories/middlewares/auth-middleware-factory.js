"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeAuthMiddleware = void 0;
const auth_middleware_1 = require("@/presentation/middlewares/auth-middleware");
const db_load_account_by_token_factory_1 = require("../use-cases/db-load-account-by-token-factory");
const makeAuthMiddleware = (role) => {
    return new auth_middleware_1.AuthMiddleware((0, db_load_account_by_token_factory_1.makeDbLoadAccountBytoken)(), role);
};
exports.makeAuthMiddleware = makeAuthMiddleware;
//# sourceMappingURL=auth-middleware-factory.js.map