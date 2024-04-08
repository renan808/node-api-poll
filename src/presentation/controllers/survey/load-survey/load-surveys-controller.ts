import { type LoadSurveys, type Controller, type httpRequest, type httpResponse, ok, serverError, noContent } from './load-surveys-protocols'

export class LoadSurveysController implements Controller {
    constructor (private readonly loadSurvey: LoadSurveys) {}

    async handle (httpRequest: httpRequest): Promise<httpResponse> {
        try {
            const surveys = await this.loadSurvey.loadAll()
            return surveys.length ? ok(surveys) : noContent()
        } catch (error) {
            console.log(error)
            return serverError(error)
        }
    }
}
