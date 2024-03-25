import { type LoadSurveys, type Controller, type httpRequest, type httpResponse, badRequest, ok, serverError } from './load-survey-protocols'

export class LoadSurveyController implements Controller {
    constructor (private readonly loadSurvey: LoadSurveys) {}

    async handle (httpRequest: httpRequest): Promise<httpResponse> {
        try {
            const surveys = await this.loadSurvey.load()
            if (surveys) {
                return ok(surveys)
            }
            return badRequest(surveys)
        } catch (error) {
            console.log(error)
            return serverError(error)
        }
    }
}
