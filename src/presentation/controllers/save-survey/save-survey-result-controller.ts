import type { Controller, LoadSurveyById, httpResponse, httpRequest, SaveSurveyResult } from "./save-survey-result-protocol"
import { forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { InvalidParamError } from '@/presentation/errors'

export class SaveSurveyResultController implements Controller {
    constructor (
        private readonly loadSurveyById: LoadSurveyById,
        private readonly saveSurveyResult: SaveSurveyResult) {}

    async handle (httpRequest: httpRequest): Promise<httpResponse> {
        try {
            const data = await this.loadSurveyById.loadById(httpRequest.params.surveyId)
            const { answer } = httpRequest.body
            const accountId = httpRequest.accountId
            if (data) {
                const answers = data.answers.map(a => a.answer)
                if (!answers.includes(answer)) {
                    return forbidden(new InvalidParamError('answer'))
                }
        } else {
                return forbidden(new InvalidParamError('surveyId'))
            }
            const res = await this.saveSurveyResult.save({
                surveyId: data.id,
                date: new Date(),
                accountId,
                answer
            })
            return await Promise.resolve(ok(res))
        } catch (error) {
            console.log(error)
            return serverError(error)
        }
    }
}
