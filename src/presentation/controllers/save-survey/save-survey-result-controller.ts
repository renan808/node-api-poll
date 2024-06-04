import type { Controller, LoadSurveyById, httpResponse, httpRequest, SaveSurveyResult } from "./save-survey-result-protocol"
import { forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { InvalidParamError } from '@/presentation/errors'

// terminar os factory e terminar essa classe pra ela usar o saveSurveyResult
export class SaveSurveyResultController implements Controller {
    constructor (
        private readonly loadSurveyById: LoadSurveyById,
        private readonly saveSurveyResult: SaveSurveyResult) {}

    async handle (httpRequest: httpRequest): Promise<httpResponse> {
        try {
            console.log(httpRequest, '<<<')
            const data = await this.loadSurveyById.loadById(httpRequest.params.surveyId)
            const { accountId, answer } = httpRequest.body
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
            return await new Promise(resolve => resolve(ok(res)))
        } catch (error) {
            return serverError(error)
        }
    }
}
