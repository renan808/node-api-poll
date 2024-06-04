import type { LoadSurveyById, SurveyModel, LoadSurveyByIdRepository } from "./db-load-survey-by-id-protocol"
export class DbLoadSurveyById implements LoadSurveyById {
    constructor (private readonly loadSurveyById: LoadSurveyByIdRepository) {}

    async loadById (id: any): Promise<SurveyModel> {
        const survey = await this.loadSurveyById.loadById(id)
        return await new Promise((resolve, reject) => resolve(survey))
    }
}
