"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const login_path_1 = require("./paths/login-path");
const index_1 = require("./schemas/index");
const index_2 = require("./components/index");
exports.default = {
    openapi: '3.1.0',
    info: {
        title: 'Clean node api',
        description: 'API FOR POLL',
        version: '1.0.0'
    },
    servers: [{
            url: '/api'
        }],
    tags: [{
            name: 'login'
        }],
    paths: {
        '/login': login_path_1.loginPath
    },
    schemas: {
        account: index_1.accountSchema,
        loginParams: index_1.loginParamsSchema,
        error: index_1.errorSchema
    },
    components: {
        badRequest: index_2.badRequest,
        serverError: index_2.serverError,
        unauthorized: index_2.unauthorized
    }
};
//# sourceMappingURL=index.js.map