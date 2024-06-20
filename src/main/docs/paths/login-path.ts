export const loginPath = {
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
}
