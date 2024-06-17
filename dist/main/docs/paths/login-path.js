"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginPath = void 0;
exports.loginPath = {
    post: {
        tags: ['Login'],
        summary: 'API for user auth',
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/schemas/loginParams'
                    }
                }
            }
        },
        responses: {
            200: {
                description: 'success',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/schemas/account'
                        }
                    }
                }
            },
            400: {
                $ref: '#/components/badRequest'
            },
            500: {
                $ref: '#/components/serverError'
            },
            401: {
                $ref: '#/components/unauthorized'
            }
        }
    }
};
//# sourceMappingURL=login-path.js.map