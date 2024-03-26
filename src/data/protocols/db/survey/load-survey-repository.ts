import type { SurveyModel } from "../../../../domain/use-cases/load-survey"

export interface LoadSurveysRepository {
    loadAll (): Promise<SurveyModel[]>
}
