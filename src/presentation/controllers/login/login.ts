import type { Controller, httpRequest, httpResponse } from '../../protocols'
import { badRequest, serverError } from '../../helpers/http-helper'
import { InvalidParamError, MissingParamError } from '../../errors'
import type { EmailValidator } from '../signup/signup-protocols'
import type { Authentication } from '../../../domain/use-cases/authentication'
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
                return await new Promise(resolve => resolve((badRequest(new MissingParamError('Email')))))
            }

            if (!password) {
                return await new Promise(resolve => resolve((badRequest(new MissingParamError('Password')))))
            }

            if (!this.emailValidator.isValid(email)) {
                return await new Promise(resolve => resolve((badRequest(new InvalidParamError('Email')))))
            }
            await this.authentication.auth(email, password)
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
