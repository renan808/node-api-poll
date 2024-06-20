export const signupPath = {
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
}
