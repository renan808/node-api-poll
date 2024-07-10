"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.surveyResultPath = void 0;
exports.surveyResultPath = {
    put: {
        security: [{
                apiKeyAuth: []
            }],
        tags: ['Survey Result'],
        summary: 'API to save a survey result',
        parameters: [{
                in: 'path',
                name: 'surveyId',
                required: true,
                schema: {
                    type: 'string'
                }
            }],
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/schemas/saveSurveyResultParams'
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
                            $ref: '#/schemas/surveyResult'
                        }
                    }
                }
            },
            500: {
                $ref: '#/components/serverError'
            },
            403: {
                $ref: '#/components/forbidden'
            }
        }
    },
    get: {
        security: [{
                apiKeyAuth: []
            }],
        tags: ['Survey Result'],
        summary: 'API to load a survey result',
        parameters: [{
                in: 'path',
                name: 'surveyId',
                required: true,
                schema: {
                    type: 'string'
                }
            }],
        responses: {
            200: {
                description: 'success',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/schemas/surveyResult'
                        }
                    }
                }
            },
            204: {
                description: 'noContent',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/schemas/noContent'
                        }
                    }
                }
            },
            500: {
                $ref: '#/components/serverError'
            },
            403: {
                $ref: '#/components/forbidden'
            }
        }
    }
};
//# sourceMappingURL=survey-result-path.js.map