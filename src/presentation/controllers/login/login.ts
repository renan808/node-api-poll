import type { Controller, httpRequest, httpResponse, EmailValidator, Authentication } from './login-protocols'
import { badRequest, serverError, unauthorized } from '../../helpers/http-helper'
import { InvalidParamError, MissingParamError } from '../../errors'
export class LoginController implements Controller {
    private readonly emailValidator: EmailValidator
    private readonly authentication: Authentication
    constructor (EmailValidator: EmailValidator, Authentication: Authentication) {
        this.emailValidator = EmailValidator
        this.authentication = Authentication
    }

    async handle (httpRequest: httpRequest): Promise<httpResponse> {
        try {
            const { email, password } = httpRequest.body
            if (!email) {
                return badRequest(new MissingParamError('Email'))
            }

            if (!password) {
                return badRequest(new MissingParamError('Password'))
            }

            if (!this.emailValidator.isValid(email)) {
                return badRequest(new InvalidParamError('Email'))
            }
            const token = await this.authentication.auth(email, password)
            if (token === 'unauthorized' || null) {
                return unauthorized()
            }
            return {
                statuscode: 200,
                body: {
                    ok: 'ok'
                }
            }
        } catch (error) {
            return serverError(error)
        }
    }
}
