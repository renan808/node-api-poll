export const addSurveyParamsSchema = {
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
}
