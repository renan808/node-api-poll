import type { SurveyModel } from "../models/survey"
import type { AddSurveyParams } from "../use-cases/survey/add-survey"

export const mockAddSurveyParams = (): AddSurveyParams => ({
    question: 'any_question',
    answers: [{
        image: 'any_image',
        answer: 'any_answer'
    }],
    date: new Date()
})

export const mockSurveyModel = (): SurveyModel => {
    return {
        id: 'any_id',
        question: 'any_question1',
        answers: [{
            image: 'any_img',
            answer: 'any_answer'
        }],
        date: new Date()
    }
}
