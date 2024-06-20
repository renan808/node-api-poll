export const surveySchema = {
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
}
