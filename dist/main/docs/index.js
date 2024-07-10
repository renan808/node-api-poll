"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./paths/index");
const index_2 = require("./schemas/index");
const index_3 = require("./components/index");
exports.default = {
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
        '/login': index_1.loginPath,
        '/surveys': index_1.surveyPath,
        '/surveys/{surveyId}/results': index_1.surveyResultPath,
        '/signup': index_1.signupPath
    },
    schemas: {
        noContent: index_2.noContentSchema,
        surveyResultAnswer: index_2.surveyResultAnswerSchema,
        surveyResult: index_2.surveyResultSchema,
        saveSurveyResultParams: index_2.saveSurveyResultParamsSchema,
        addSurveyParams: index_2.addSurveyParamsSchema,
        account: index_2.accountSchema,
        token: index_2.tokenSchema,
        signupParams: index_2.signupParamsSchema,
        loginParams: index_2.loginParamsSchema,
        error: index_2.errorSchema,
        surveys: index_2.surveysSchema,
        survey: index_2.surveySchema,
        surveyAnswer: index_2.surveyAnswerSchema
    },
    components: {
        securitySchemes: {
            apiKeyAuth: index_2.apiKeyAuthSchema
        },
        badRequest: index_3.badRequest,
        serverError: index_3.serverError,
        unauthorized: index_3.unauthorized,
        forbidden: index_3.forbidden
    }
};
//# sourceMappingURL=index.js.map