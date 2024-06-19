export const signupParamsSchema = {
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
}
