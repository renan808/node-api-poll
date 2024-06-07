import type { SurveyResultModel } from "@/domain/models/survey-result"
import type { SaveSurveyResultParams } from "@/domain/use-cases/survey-result/save-survey-result"

export interface SaveSurveyResultRepository {
    save (data: SaveSurveyResultParams): Promise<SurveyResultModel>
}
