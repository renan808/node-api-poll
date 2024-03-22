import type { LoadSurveys, Controller, httpRequest, httpResponse } from './load-survey-protocols'
import { ok } from '../../../helpers/http/http-helper'

export class LoadSurveyController implements Controller {
    constructor (private readonly loadSurvey: LoadSurveys) {}

    async handle (httpRequest: httpRequest): Promise<httpResponse> {
        await this.loadSurvey.load()
        return ok({})
    }
}
