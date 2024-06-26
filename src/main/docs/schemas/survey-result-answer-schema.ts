export const surveyResultAnswerSchema = {
    type: 'object',
    properties: {
        image: 'string',
        answer: 'string',
        count: 'number',
        percent: 'number'
    },
    required: ['image', 'answer', 'count', 'percent']
}
