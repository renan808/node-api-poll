import type { AddSurveyModel } from "../../../../domain/use-cases/add-survey"

export interface AddSurveyRepository {
    add(survetData: AddSurveyModel): Promise<void>
}
