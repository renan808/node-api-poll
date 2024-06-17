import { loginPath } from './paths/login-path'
import { loginParamsSchema, errorSchema, accountSchema } from './schemas/index'
import { badRequest, serverError, unauthorized } from './components/index'
export default {
    openapi: '3.1.0',
    info: {
        title: 'Clean node api',
        description: 'API FOR POLL',
        version: '1.0.0'
    },
    servers: [{
        url: '/api'
    }],
    tags: [{
        name: 'login'
    }],
    paths: {
        '/login': loginPath
    },
    schemas: {
        account: accountSchema,
        loginParams: loginParamsSchema,
        error: errorSchema
    },
    components: {
        badRequest,
        serverError,
        unauthorized
    }
}
