import type { SurveyModel } from "@/domain/models/survey"

export interface LoadSurveyByIdRepository {
    load (id: string): Promise<SurveyModel>
}
