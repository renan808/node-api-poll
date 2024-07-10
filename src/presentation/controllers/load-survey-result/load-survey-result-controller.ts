import type { Controller, httpRequest, httpResponse } from "@/presentation/protocols"
import type { LoadSurveyResult } from "@/domain/use-cases/survey-result/load-survey-result"
import { forbidden, InvalidParamError, type LoadSurveyById, noContent, ok, serverError } from "../save-survey/save-survey-result-protocol"

export class LoadSurveyResultController implements Controller {
    constructor (
        private readonly loadSurveyResult: LoadSurveyResult,
        private readonly loadSurveyById: LoadSurveyById
    ) {}

    async handle (httpRequest: httpRequest): Promise<httpResponse> {
        console.log(httpRequest)
        try {
            const survey = await this.loadSurveyById.loadById(httpRequest.params.surveyId)
            if (!survey) {
                return forbidden(new InvalidParamError('surveyId'))
            }
            const surveyResult = await this.loadSurveyResult.loadBySurveyId(httpRequest.params.surveyId)
            if (!surveyResult) {
                return noContent()
            }
            return ok(surveyResult)
        } catch (error) {
            console.log(error)
            return serverError(error)
        }
    }
}
