export const surveyPath = {
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
}
