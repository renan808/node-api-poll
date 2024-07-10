import { SurveyResultMongoRepository } from "@/infra/db/mongo-db/survey-result/survey-result-mongo-repository"
import type { LoadSurveyResult } from "@/domain/use-cases/survey-result/load-survey-result"
import { DbLoadSurveyResult } from "@/data/use-cases/survey-result/load-survey-result/db-load-survey-result"

export const makeDbLoadSurveyResult = (): LoadSurveyResult => {
    const surveyResultMongoRepository = new SurveyResultMongoRepository()
    return new DbLoadSurveyResult(surveyResultMongoRepository)
}
