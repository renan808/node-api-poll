export const surveyPath = {
    get: {
        security: [{
            apiKeyAuth: []
        }],
        tags: ['Survey'],
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
    },
    post: {
        security: [{
            apiKeyAuth: []
        }],
        tags: ['Survey'],
        summary: 'API to add surveys',
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/schemas/addSurveyParams'
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
                            $ref: '#/schemas/addSurveyParams'
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
}
