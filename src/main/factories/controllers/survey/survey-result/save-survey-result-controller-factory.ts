import type { Controller } from "@/presentation/protocols"
import { LogMongoRepository } from "@/infra/db/mongo-db/log/log-mongo-repository"
import { LogControllerDecorator } from "@/main/decorators/log-controller-decorator"
import { SaveSurveyResultController } from "@/presentation/controllers/save-survey/save-survey-result-controller"
import { makeDbLoadSurveyById } from "@/main/factories/use-cases/survey/db-load-survey-by-id-factory"
import { makeDbSaveSurveyResult } from "@/main/factories/use-cases/survey-result/db-save-survey-result-factory"

export const makeSaveSurveyResultController = (): Controller => {
    const saveSurveyResultController = new SaveSurveyResultController(makeDbLoadSurveyById(), makeDbSaveSurveyResult())
    const logMongoRepository = new LogMongoRepository()
    return new LogControllerDecorator(saveSurveyResultController, logMongoRepository)
}
