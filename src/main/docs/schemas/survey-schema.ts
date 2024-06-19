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
        questions: {
            type: 'string'
        },
        date: {
            type: 'date'
        }
    }
}
