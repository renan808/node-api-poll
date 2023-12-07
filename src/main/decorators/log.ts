import type { httpRequest, httpResponse, Controller } from '../../presentation/protocols'

export class LogControllerDecorator implements Controller {
    private readonly controller: Controller
    constructor (controller: Controller) {
        this.controller = controller
    }

    async handle (httpRequest: httpRequest): Promise<httpResponse> {
        const httpResponse = await this.controller.handle(httpRequest)
        return httpResponse
    }
}
