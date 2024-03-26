import type { LoadSurveys, LoadSurveysRepository, SurveyModel } from "./db-load-surveys-protocol"

export class DbLoadSurveys implements LoadSurveys {
    constructor (private readonly loadSurveysRepository: LoadSurveysRepository) {}

    async loadAll (): Promise<SurveyModel[]> {
        const survey = await this.loadSurveysRepository.loadAll()
        return survey
    }
}
