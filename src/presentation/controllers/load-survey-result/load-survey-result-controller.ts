import type { Controller, httpRequest, httpResponse } from "@/presentation/protocols"
import type { LoadSurveyResult } from "@/domain/use-cases/survey-result/load-survey-result"
import { forbidden, InvalidParamError, ok, serverError, unauthorized } from "../save-survey/save-survey-result-protocol"

export class LoadSurveyResultController implements Controller {
    constructor (private readonly loadSurveyResult: LoadSurveyResult) {}

    async handle (httpRequest: httpRequest): Promise<httpResponse> {
        try {
            if (!httpRequest.headers) {
                return unauthorized()
            }
            const surveyResult = await this.loadSurveyResult.loadBySurveyId(httpRequest.body)
            if (!surveyResult) {
                return forbidden(new InvalidParamError('surveyId'))
            }
            return ok(surveyResult)
        } catch (error) {
            console.log(error)
            return serverError(error)
        }
    }
}
