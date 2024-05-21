import type { Controller, LoadSurveyById, httpResponse, httpRequest } from "./save-survey-result-protocol"
import { forbidden, ok } from "../survey/load-survey/load-surveys-protocols"
import { InvalidParamError } from '@/presentation/errors'

export class SaveSurveyResultController implements Controller {
    constructor (private readonly loadSurveyById: LoadSurveyById) {}
    async handle (httpRequest: httpRequest): Promise<httpResponse> {
        const res = await this.loadSurveyById.loadById(httpRequest.params.surveyId)
        if (!res) {
            return forbidden(new InvalidParamError('surveyId'))
        }
        return await new Promise(resolve => resolve(ok(res)))
    }
}
