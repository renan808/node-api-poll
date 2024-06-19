import { loginPath, signupPath, surveyPath } from './paths/index'
import { loginParamsSchema, errorSchema, accountSchema, surveyAnswerSchema, surveysSchema, surveySchema, apiKeyAuthSchema, tokenSchema, signupParamsSchema } from './schemas/index'
import { badRequest, forbidden, serverError, unauthorized } from './components/index'
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
    paths: {
        '/login': loginPath,
        '/surveys': surveyPath,
        '/signup': signupPath
    },
    schemas: {
        account: accountSchema,
        token: tokenSchema,
        signupParams: signupParamsSchema,
        loginParams: loginParamsSchema,
        error: errorSchema,
        surveys: surveysSchema,
        survey: surveySchema,
        surveyAnswer: surveyAnswerSchema
    },
    components: {
        securitySchemes: {
            apiKeyAuth: apiKeyAuthSchema
        },
        badRequest,
        serverError,
        unauthorized,
        forbidden
    }
}
