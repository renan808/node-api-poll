"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupParamsSchema = void 0;
exports.signupParamsSchema = {
    type: 'object',
    properties: {
        name: {
            type: 'string'
        },
        email: {
            type: 'string'
        },
        password: {
            type: 'string'
        },
        password_confirm: {
            type: 'string'
        }
    },
    required: ['email', 'password', 'name', 'password_confirm']
};
//# sourceMappingURL=signup-params-schema.js.map