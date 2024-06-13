import type { SaveSurveyResultParams } from "../use-cases/survey-result/save-survey-result"
import type { httpRequest } from "@/presentation/protocols"

export const mockSurveyResultData = (): SaveSurveyResultParams => ({
    surveyId: 'any_survey_id',
    accountId: 'any_account_id',
    answer: 'any_answer',
    date: new Date()
})

export const mockRequest = (): httpRequest => ({
    params: {
        surveyId: 'any_SurveyId'
    },
    body: {
        answer: 'any_answer'
    },
    accountId: 'any_accountId'
})
