import type { httpRequest, httpResponse, Middleware } from "../protocols"
import { AcessDeniedError } from '../errors/index'
import { forbidden } from '../helpers/http/http-helper'
import type { LoadAccountByToken } from "../../domain/use-cases/load-account-by-token"
export class AuthMiddleware implements Middleware {
    constructor (private readonly loadAccountByToken: LoadAccountByToken) {}

    async handle (httpRequest: httpRequest): Promise<httpResponse> {
        const token = httpRequest.headers?.['x-acess-token']
        if (token) {
            await this.loadAccountByToken.load(token)
        }
        return await new Promise(resolve => resolve(forbidden(new AcessDeniedError())))
    }
}
