import type { httpResponse, httpRequest } from '../protocols/http'
import { MissingParamError } from '../errors/missing-param-error'

export class SignUpController {
    handle (httpRequest: httpRequest): httpResponse {
        if (!httpRequest.body.name) {
            return {
                statuscode: 400,
                body: new MissingParamError('name')
            }
        }
        if (!httpRequest.body.email) {
            return {
                statuscode: 400,
                body: new MissingParamError('email')
            }
        }
        if (!httpRequest.body.password) {
            return {
                statuscode: 400,
                body: new MissingParamError('password')
            }
        }
        return {
            statuscode: 200,
            body: httpRequest.body
        }
    }
}
