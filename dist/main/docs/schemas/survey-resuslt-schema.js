"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.surveyResultSchema = void 0;
exports.surveyResultSchema = {
    type: 'object',
    properties: {
        surveyId: {
            type: 'string'
        },
        answers: {
            type: 'array',
            items: {
                $ref: '#/schemas/surveyResultAnswer'
            }
        },
        date: {
            type: 'string'
        },
        question: {
            type: 'string'
        }
    },
    required: ['surveyId', 'answers', 'date', 'question']
};
//# sourceMappingURL=survey-resuslt-schema.js.map