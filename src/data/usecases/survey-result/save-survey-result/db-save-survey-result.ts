import type { SaveSurveyResult, SaveSurveyResultParams, SurveyResultModel, SaveSurveyResultRepository } from "./db-save-survey-result-protocol"

export class DbSaveSurveyResult implements SaveSurveyResult {
    constructor (private readonly SaveSurveyResultRepository: SaveSurveyResultRepository) {}
    async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
        const surveyResult = await this.SaveSurveyResultRepository.save(data)
        return await new Promise((resolve, reject) => resolve(surveyResult))
    }
}
