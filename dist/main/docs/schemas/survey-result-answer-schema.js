"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.surveyResultAnswerSchema = void 0;
exports.surveyResultAnswerSchema = {
    type: 'object',
    properties: {
        image: 'string',
        answer: 'string',
        count: 'number',
        percent: 'number'
    },
    required: ['image', 'answer', 'count', 'percent']
};
//# sourceMappingURL=survey-result-answer-schema.js.map