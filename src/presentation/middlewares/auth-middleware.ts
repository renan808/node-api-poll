import type { httpRequest, httpResponse, Middleware } from "../protocols"
import { AcessDeniedError } from '../errors/index'
import { forbidden, ok, serverError } from '../helpers/http/http-helper'
import type { LoadAccountByToken } from "@/domain/use-cases/load-account-by-token"
export class AuthMiddleware implements Middleware {
    constructor (private readonly loadAccountByToken: LoadAccountByToken, private readonly role?: string) {}

    async handle (httpRequest: httpRequest): Promise<httpResponse> {
        try {
            const token = httpRequest.headers?.['x-acess-token']
            if (token) {
                const account = await this.loadAccountByToken.load(token, this.role)
                if (account) {
                    return ok({ accountId: account.id })
                }
            }
            return forbidden(new AcessDeniedError())
        } catch (error) {
            return serverError(error)
        }
    }
}
