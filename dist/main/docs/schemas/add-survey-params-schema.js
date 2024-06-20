"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addSurveyParamsSchema = void 0;
exports.addSurveyParamsSchema = {
    type: 'object',
    properties: {
        answers: {
            type: 'array',
            items: {
                $ref: '#/schemas/surveyAnswer'
            }
        },
        question: {
            type: 'string'
        }
    }
};
//# sourceMappingURL=add-survey-params-schema.js.map