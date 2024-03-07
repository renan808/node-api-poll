import type { httpRequest, httpResponse, Middleware } from "../protocols"
import { AcessDeniedError } from '../errors/index'
import { forbidden } from '../helpers/http/http-helper'
export class AuthMiddleware implements Middleware {
    async handle (httpRequest: httpRequest): Promise<httpResponse> {
        return await new Promise(resolve => resolve(forbidden(new AcessDeniedError())))
    }
}
