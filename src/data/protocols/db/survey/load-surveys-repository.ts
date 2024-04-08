import type { SurveyModel } from "../../../../domain/use-cases/load-surveys"

export interface LoadSurveysRepository {
    loadAll (): Promise<SurveyModel[]>
}
