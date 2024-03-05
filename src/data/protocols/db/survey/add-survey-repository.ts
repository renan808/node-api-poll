import type { AddSurveyModel } from "../../../../domain/use-cases/add-survey"

export interface AddSurveyRepository {
    add(surveyData: AddSurveyModel): Promise<void>
}
