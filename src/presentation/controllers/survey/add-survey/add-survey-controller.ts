import type { AddSurvey, Controller, Validation, httpRequest, httpResponse } from "./add-survey-protocols"
import { badRequest, serverError, ok } from "../../../helpers/http/http-helper"

export class AddSurveyController implements Controller {
    constructor (private readonly validation: Validation, private readonly addSurvey: AddSurvey) {}

    async handle (httpRequest: httpRequest): Promise<httpResponse> {
        try {
            const error = this.validation.validate(httpRequest.body)
            if (error) {
                console.log(error)
                return badRequest(error)
            }
            const { question, answers } = httpRequest.body
            this.addSurvey.add({
                question,
                answers,
                date: new Date()
            })
            return ok(httpRequest.body)
        } catch (error) {
            return serverError(error)
        }
    }
}
