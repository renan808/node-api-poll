import type { LoadSurveyResult } from "@/domain/use-cases/survey-result/load-survey-result"
import type { SurveyResultModel } from "../save-survey-result/db-save-survey-result-protocol"
import type { LoadSurveyResultRepository } from "@/data/protocols/db/survey-result/load-survey-result-repository"

export class DbLoadSurveyResult implements LoadSurveyResult {
    constructor (private readonly loadSurveyResultRepository: LoadSurveyResultRepository) {}
    async load (surveyId: string): Promise<SurveyResultModel> {
        const response = await this.loadSurveyResultRepository.load(surveyId)
        return response
    }
}
