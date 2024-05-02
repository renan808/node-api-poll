import type { httpResponse, httpRequest, Controller, AddAccount, Validation } from './signup-controler-protocols'
import { badRequest, serverError, ok } from '@/presentation/helpers/http/http-helper'
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
            const error = this.Validation.validate(httpRequest.body)
            if (error) {
                return badRequest(error)
            }
            const { name, password, email } = httpRequest.body
            await this.AddAccount.add({
                name,
                email,
                password
            })
            const token = await this.Authentication.auth({ email, password })
            return ok({ token })
        } catch (error) {
            console.log(error)
            if (error.message === 'Email already exists.') {
                return badRequest(error.message)
            }
            console.log(error)
            return serverError(error)
        }
    }
}
