import type { httpRequest, httpResponse, Middleware } from "../protocols"
import { AcessDeniedError } from '../errors/index'
import { forbidden, ok } from '../helpers/http/http-helper'
import type { LoadAccountByToken } from "../../domain/use-cases/load-account-by-token"
export class AuthMiddleware implements Middleware {
    constructor (private readonly loadAccountByToken: LoadAccountByToken) {}

    async handle (httpRequest: httpRequest): Promise<httpResponse> {
        const token = httpRequest.headers?.['x-acess-token']
        if (token) {
            const account = await this.loadAccountByToken.load(token)
            if (account) {
                return ok({ accountId: account.id })
            }
        }
        return forbidden(new AcessDeniedError())
    }
}
