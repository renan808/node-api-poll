import { type LoadSurveys, type Controller, type httpRequest, type httpResponse, ok, serverError, noContent } from './load-survey-protocols'

export class LoadSurveyController implements Controller {
    constructor (private readonly loadSurvey: LoadSurveys) {}

    async handle (httpRequest: httpRequest): Promise<httpResponse> {
        try {
            const surveys = await this.loadSurvey.load()
            return surveys.length ? ok(surveys) : noContent()
        } catch (error) {
            console.log(error)
            return serverError(error)
        }
    }
}
