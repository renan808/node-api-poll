import type { Controller, Validation, httpRequest, httpResponse } from "./add-survey-protocols"
import { badRequest, serverError } from "../../../helpers/http/http-helper"
export class AddSurveyController implements Controller {
    constructor (private readonly validation: Validation) {}

    async handle (httpRequest: httpRequest): Promise<httpResponse> {
        try {
            const error = this.validation.validate(httpRequest.body)
            if (error) {
                return badRequest(error)
            }
            return await new Promise((resolve, reject) => reject(new Error()))
        } catch (error) {
            return serverError(error)
        }
    }
}
