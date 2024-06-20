"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginParamsSchema = void 0;
exports.loginParamsSchema = {
    type: 'object',
    properties: {
        email: {
            type: 'string'
        },
        password: {
            type: 'string'
        }
    },
    required: ['email', 'password']
};
//# sourceMappingURL=login-params-schema.js.map