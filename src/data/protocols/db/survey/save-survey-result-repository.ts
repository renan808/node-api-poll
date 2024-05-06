import type { SurveyResultModel } from "@/domain/models/survey-result"
import type { SaveSurveyResultModel } from "@/domain/use-cases/save-survey-result"

export interface SaveSurveyResultRepository {
    save (data: SaveSurveyResultModel): Promise<SurveyResultModel>
}
