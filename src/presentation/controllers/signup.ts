import type { httpResponse, httpRequest } from '../protocols/http'
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'

export class SignUpController {
    handle (httpRequest: httpRequest): httpResponse {
        const requiredFields = ['name', 'password', 'email', 'password_confirm']
        let missingfield
        for (const field of requiredFields) {
            if (!httpRequest.body[field]) {
                missingfield = field
            }
        }
        return badRequest(new MissingParamError(missingfield))
    }
}
