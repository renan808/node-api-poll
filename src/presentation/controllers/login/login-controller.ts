import type { Controller, httpRequest, httpResponse, Authentication } from './login-controler-protocols'
import { badRequest, serverError, unauthorized, ok } from '../../helpers/http/http-helper'
import type { Validation } from '../signup/signup-controler-protocols'
export class LoginController implements Controller {
    constructor (private readonly Authentication: Authentication, private readonly Validation: Validation) {
    }

    async handle (httpRequest: httpRequest): Promise<httpResponse> {
        try {
            const error = this.Validation.validate(httpRequest.body)
            if (error) {
                return badRequest(error)
            }
            const token = await this.Authentication.auth(httpRequest.body)
            if (token === 'unauthorized' || null) {
                return unauthorized()
            }
            return ok({
                token
            })
        } catch (error) {
            console.log(error)
            return serverError(error)
        }
    }
}
