import type { SurveyModel } from "../models/survey"
import type { AddSurveyParams } from "../use-cases/survey/add-survey"
import type { httpRequest } from "@/presentation/protocols"
import type { SurveyResultModel } from "../models/survey-result"

export const mockAddSurveyParams = (): AddSurveyParams => ({
    question: 'any_question',
    answers: [{
        image: 'any_image',
        answer: 'any_answer'
    }],
    date: new Date()
})

export const mockSurveyResult = (): SurveyResultModel => ({
    surveyId: 'any_survey_id',
    question: 'any_question',
    answers: [{
        image: 'any_image',
        count: 1,
        percent: 20,
        answer: 'any_answer'
    }, {
        image: 'any_image',
        count: 10,
        percent: 80,
        answer: 'any_answer'
    }],
    date: new Date()
})

export const mockSurveyModel = (): SurveyModel => {
    return {
        id: 'any_survey_id',
        question: 'any_question1',
        answers: [{
            image: 'any_img',
            answer: 'any_answer'
        }],
        date: new Date()
    }
}
export const mockRequest = (): httpRequest => ({
    body: {
        question: 'any_question',
        answers: [{
            image: 'any_image',
            answer: 'any_answer'
        }],
        date: new Date()
    }
})

export const mockSurveysModel = (): SurveyModel[] => {
    return [{
        id: 'any_id',
        question: 'any_question1',
        answers: [{
            image: 'any_img',
            answer: 'any_answer'
        }],
        date: new Date()
    }, {
        id: 'any_id',
        question: 'any_question2',
        answers: [{
            image: 'any_img',
            answer: 'any_answer'
        }],
        date: new Date()
    }
]
}
