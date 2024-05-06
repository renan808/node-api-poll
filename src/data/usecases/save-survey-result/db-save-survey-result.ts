import type { SaveSurveyResult, SaveSurveyResultModel, SurveyResultModel, SaveSurveyResultRepository } from "./db-save-survey-result-protocol"

export class DbSaveSurveyResult implements SaveSurveyResult {
    constructor (private readonly SaveSurveyResultRepository: SaveSurveyResultRepository) {}
    async save (data: SaveSurveyResultModel): Promise<SurveyResultModel> {
        const surveyResult = await this.SaveSurveyResultRepository.save(data)
        return await new Promise((resolve, reject) => resolve(surveyResult))
    }
}
