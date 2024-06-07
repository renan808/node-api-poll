import type { SurveyModel } from "../models/survey"
import type { AddSurveyParams } from "../use-cases/survey/add-survey"
import type { SurveyResultModel } from "../models/survey-result"
import type { SaveSurveyResultRepository } from "@/data/protocols/db/survey-result/save-survey-result-repository"
import type { SaveSurveyResultParams } from "../use-cases/survey-result/save-survey-result"
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

export const mockSurveyResultData = (): SaveSurveyResultParams => ({
    surveyId: 'any_survey_id',
    accountId: 'any_account_id',
    answer: 'any_answer',
    date: new Date()
})

export const mockSurveyResult = (): SurveyResultModel => Object.assign(
    {}, mockSurveyResultData(), { id: 'any_id' }
)

export const mockSaveSurveyResultRepository = (): SaveSurveyResultRepository => {
    class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
        async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
            return await new Promise((resolve, reject) => resolve(mockSurveyResult()))
        }
    }

    return new SaveSurveyResultRepositoryStub()
}
