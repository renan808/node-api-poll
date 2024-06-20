export const surveyResultSchema = {
    type: 'object',
    properties: {
        accountId: {
            type: 'string'
        },
        surveyId: {
            type: 'string'
        },
        answer: {
            type: 'string'
        },
        date: {
            type: 'date'
        },
        id: {
            type: 'string'
        }
    }
}
