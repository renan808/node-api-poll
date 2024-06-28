import { SurveyMongoRepository } from "@/infra/db/mongo-db/survey/survey-mongo-repository"
import type { LoadSurveyById } from "@/domain/use-cases/survey/load-survey-by-id"
import { DbLoadSurveyById } from "@/data/use-cases/survey/load-survey-by-id/db-load-survey-by-id"

export const makeDbLoadSurveyById = (): LoadSurveyById => {
    return new DbLoadSurveyById(new SurveyMongoRepository())
}
