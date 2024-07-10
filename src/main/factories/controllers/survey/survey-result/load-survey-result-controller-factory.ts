import type { Controller } from "@/presentation/protocols"
import { LogMongoRepository } from "@/infra/db/mongo-db/log/log-mongo-repository"
import { LogControllerDecorator } from "@/main/decorators/log-controller-decorator"
import { LoadSurveyResultController } from "@/presentation/controllers/load-survey-result/load-survey-result-controller"
import { makeDbLoadSurveyResult } from "@/main/factories/use-cases/survey-result/db-load-survey-result-factory"
import { makeDbLoadSurveyById } from "@/main/factories/use-cases/survey/db-load-survey-by-id-factory"

export const makeLoadSurveyResultController = (): Controller => {
    const loadSurveyResultController = new LoadSurveyResultController(makeDbLoadSurveyResult(), makeDbLoadSurveyById())
    const logMongoRepository = new LogMongoRepository()
    return new LogControllerDecorator(loadSurveyResultController, logMongoRepository)
}
