import { SurveyResultMongoRepository } from "@/infra/db/mongo-db/survey-result/survey-result-mongo-repository"
import type { SaveSurveyResult } from "@/domain/use-cases/survey-result/save-survey-result"
import { DbSaveSurveyResult } from "@/data/usecases/survey-result/save-survey-result/db-save-survey-result"

export const makeDbSaveSurveyResult = (): SaveSurveyResult => {
    const surveyResultMongoRepository = new SurveyResultMongoRepository()
    return new DbSaveSurveyResult(surveyResultMongoRepository)
}
