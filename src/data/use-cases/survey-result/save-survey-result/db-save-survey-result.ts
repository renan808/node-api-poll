import type { LoadSurveyResultRepository } from "@/data/protocols/db/survey-result/load-survey-result-repository"
import type { SaveSurveyResult, SaveSurveyResultParams, SaveSurveyResultRepository, SurveyResultModel } from "./db-save-survey-result-protocol"

export class DbSaveSurveyResult implements SaveSurveyResult {
    constructor (
        private readonly SaveSurveyResultRepository: SaveSurveyResultRepository,
        private readonly LoadSurveyResultRepository: LoadSurveyResultRepository
    ) {}

    async save (data: SaveSurveyResultParams): Promise<SurveyResultModel | null> {
        await this.SaveSurveyResultRepository.save(data)
        const surveyResult = await this.LoadSurveyResultRepository.loadBySurveyId(data.surveyId)
        return await Promise.resolve(surveyResult)
    }
}
