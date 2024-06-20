"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupPath = void 0;
exports.signupPath = {
    post: {
        tags: ['Signup'],
        summary: 'API to register a user',
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/schemas/signupParams'
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
                            $ref: '#/schemas/token'
                        }
                    }
                }
            },
            500: {
                $ref: '#/components/serverError'
            },
            400: {
                $ref: '#/components/badRequest'
            }
        }
    }
};
//# sourceMappingURL=signup-path.js.map