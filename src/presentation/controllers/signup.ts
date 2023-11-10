import type { httpResponse, httpRequest } from '../protocols/http'
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'
import type { Controller } from '../protocols/controller'
import type { EmailValidator } from '../protocols/EmailValidator'
import { InvalidParamError } from '../errors/invalid-param-error'
import { ServerError } from '../errors/Server-error'

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
            for (const field of requiredFields) {
                if (!httpRequest.body[field]) {
                    missingfield = field
                    return badRequest(new MissingParamError(missingfield))
                }
            }
            if (!this.emailValidator.isValid(httpRequest.body.email)) {
                invalidParam = 'email'
            }
            return badRequest(new InvalidParamError(invalidParam))
        } catch {
            return {
                statuscode: 500,
                body: new ServerError()
            }
        }
    }
}
