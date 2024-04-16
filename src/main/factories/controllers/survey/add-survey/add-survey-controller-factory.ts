import type { Controller } from '@/presentation/protocols'
import { AddSurveyController } from '@/presentation/controllers/survey/add-survey/add-survey-controller'
import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator'
import { LogMongoRepository } from '@/infra/db/mongo-db/log/log-mongo-repository'
import { makeAddSurveyValidation } from './add-survey-validation-factory'
import { SurveyMongoRepository } from '@/infra/db/mongo-db/survey/survey-mongo-repository'

export const makeAddSurveyController = (): Controller => {
    const addSurveyController = new AddSurveyController(makeAddSurveyValidation(), new SurveyMongoRepository())
    const logMongoRepository = new LogMongoRepository()
    return new LogControllerDecorator(addSurveyController, logMongoRepository)
}
