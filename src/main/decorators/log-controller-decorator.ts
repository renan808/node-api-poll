import type { httpRequest, httpResponse, Controller } from '../../presentation/protocols'
import type { LogErrorRepository } from '../../data/protocols/db/log/log-error-repository'

export class LogControllerDecorator implements Controller {
    constructor (private readonly controller: Controller, private readonly logErrorRepository: LogErrorRepository) {
    }

    async handle (httpRequest: httpRequest): Promise<httpResponse> {
        const httpResponse = await this.controller.handle(httpRequest)
        if (httpResponse.statuscode === 500) {
            await this.logErrorRepository.logError(httpResponse.body.stack)
        }
        return httpResponse
    }
}
