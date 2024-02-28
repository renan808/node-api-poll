import type { Controller, Validation, httpRequest, httpResponse } from "./add-survey-protocols"
import { serverError } from "../../../helpers/http/http-helper"
export class AddSurveyController implements Controller {
    constructor (private readonly validation: Validation) {}

    async handle (httpRequest: httpRequest): Promise<httpResponse> {
        try {
            this.validation.validate(httpRequest.body)
            return await new Promise((resolve, reject) => reject(new Error()))
        } catch (error) {
            return serverError(error)
        }
    }
}
