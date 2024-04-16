import type { Controller } from "@/presentation/protocols"
import { LoadSurveysController } from "@/presentation/controllers/survey/load-survey/load-surveys-protocols"
import { LogMongoRepository } from "@/infra/db/mongo-db/log/log-mongo-repository"
import { LogControllerDecorator } from "@/main/decorators/log-controller-decorator"
import { SurveyMongoRepository } from "@/infra/db/mongo-db/survey/survey-mongo-repository"

export const makeLoadSurveysController = (): Controller => {
    const loadSurveysController = new LoadSurveysController(new SurveyMongoRepository())
    const logMongoRepository = new LogMongoRepository()
    return new LogControllerDecorator(loadSurveysController, logMongoRepository)
}
