import type { httpResponse, httpRequest, Controller, AddAccount, Validation } from './signup-controler-protocols'
import { badRequest, serverError, ok } from '../../helpers/http/http-helper'
import type { Authentication } from '../login/login-controler-protocols'
export class SignUpController implements Controller {
    constructor (
        private readonly Validation: Validation,
        private readonly AddAccount: AddAccount,
        private readonly Authentication: Authentication
    ) {
    }

    async handle (httpRequest: httpRequest): Promise<httpResponse> {
        try {
            const error = await this.Validation.validate(httpRequest.body)
            if (error) {
                return badRequest(error)
            }
            const { name, password, email } = httpRequest.body
            await this.AddAccount.add({
                name,
                email,
                password
            })
            const account = { email, password }
            const token = await this.Authentication.auth(account)
            return ok(token)
        } catch (error) {
            return serverError(error)
        }
    }
}
