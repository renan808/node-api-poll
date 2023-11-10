import type { httpResponse, httpRequest, Controller, EmailValidator } from '../protocols'
import { MissingParamError, InvalidParamError } from '../errors/'
import { badRequest, serverError } from '../helpers/http-helper'

export class SignUpController implements Controller {
    private readonly emailValidator: EmailValidator
    constructor (emailValidator: EmailValidator) {
        this.emailValidator = emailValidator
    }

    handle (httpRequest: httpRequest): httpResponse {
        try {
            const requiredFields = ['name', 'password', 'email', 'password_confirm']
            let missingfield
            let invalidParam
            const { email, password, password_confirm } = httpRequest.body
            for (const field of requiredFields) {
                if (!httpRequest.body[field]) {
                    missingfield = field
                    return badRequest(new MissingParamError(missingfield))
                }
            }
            if (!this.emailValidator.isValid(email)) {
                invalidParam = 'email'
            }
            if (password !== password_confirm) {
                return badRequest(new InvalidParamError('password_confirm'))
            }

            return badRequest(new InvalidParamError(invalidParam))
        } catch {
            return serverError()
        }
    }
}
