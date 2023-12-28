import type { Controller, httpRequest, httpResponse, Authentication } from './login-controler-protocols'
import { badRequest, serverError, unauthorized } from '../../helpers/http/http-helper'
import type { Validation } from '../signup/signup-controler-protocols'
export class LoginController implements Controller {
    private readonly validation: Validation
    private readonly authentication: Authentication
    constructor (Authentication: Authentication, Validation: Validation) {
        this.validation = Validation
        this.authentication = Authentication
    }

    async handle (httpRequest: httpRequest): Promise<httpResponse> {
        try {
            const error = this.validation.validate(httpRequest.body)
            if (error) {
                return badRequest(error)
            }
            const token = await this.authentication.auth(httpRequest.body)
            if (token === 'unauthorized' || null) {
                return unauthorized()
            }
            return {
                statuscode: 200,
                body: {
                    token: 'any_token'
                }
            }
        } catch (error) {
            return serverError(error)
        }
    }
}
