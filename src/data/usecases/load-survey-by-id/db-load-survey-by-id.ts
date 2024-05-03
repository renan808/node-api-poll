import type { LoadSurveyById, SurveyModel, LoadSurveyByIdRepository } from "./db-load-survey-by-id-protocol"
export class DbLoadSurveyById implements LoadSurveyById {
    constructor (private readonly loadSurveyById: LoadSurveyByIdRepository) {}

    async load (id: string): Promise<SurveyModel> {
        await this.loadSurveyById.load(id)
        return await new Promise((resolve, reject) => reject(new Error()))
    }
}
