"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.surveySchema = void 0;
exports.surveySchema = {
    type: 'object',
    properties: {
        id: {
            type: 'string'
        },
        answers: {
            type: 'array',
            items: {
                $ref: '#/schemas/surveyAnswer'
            }
        },
        question: {
            type: 'string'
        },
        date: {
            type: 'date'
        }
    }
};
//# sourceMappingURL=survey-schema.js.map