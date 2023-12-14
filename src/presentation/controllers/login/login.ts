import type { Controller, httpRequest, httpResponse } from '../../protocols'
import { badRequest } from '../../helpers/http-helper'
import { InvalidParamError, MissingParamError } from '../../errors'
import type { EmailValidator } from '../signup/signup-protocols'
export class LoginController implements Controller {
    private readonly emailValidator: EmailValidator
    constructor (EmailValidator: EmailValidator) {
        this.emailValidator = EmailValidator
    }

    async handle (httpRequest: httpRequest): Promise<httpResponse> {
        if (!httpRequest.body.email) {
            return await new Promise(resolve => resolve((badRequest(new MissingParamError('Email')))))
        }
        if (!httpRequest.body.password) {
            return await new Promise(resolve => resolve((badRequest(new MissingParamError('Password')))))
        }
        if (!this.emailValidator.isValid(httpRequest.body.email)) {
            return await new Promise(resolve => resolve((badRequest(new InvalidParamError('Email')))))
        }

        return {
            statuscode: 200,
            body: {
                ok: 'ok'
            }
        }
    }
}
