export const surveyResultSchema = {
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
}
