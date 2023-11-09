import type { httpRequest, httpResponse } from './http'

export interface Controller {
    handle(httpRequest: httpRequest): httpResponse
}
