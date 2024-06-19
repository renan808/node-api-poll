"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.surveyPath = void 0;
exports.surveyPath = {
    get: {
        security: [{
                apiKeyAuth: []
            }],
        tags: ['Load Surveys'],
        summary: 'API to list all surveys',
        responses: {
            200: {
                description: 'success',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/schemas/surveys'
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
//# sourceMappingURL=survey-path.js.map