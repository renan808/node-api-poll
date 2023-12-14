import type { Controller, httpRequest, httpResponse } from '../../protocols'
import { badRequest } from '../../helpers/http-helper'
import { MissingParamError } from '../../errors'
export class LoginController implements Controller {
    async handle (httpRequest: httpRequest): Promise<httpResponse> {
        if (!httpRequest.body.email) {
            return await new Promise(resolve => resolve((badRequest(new MissingParamError('Email')))))
        }
        if (!httpRequest.body.password) {
            return await new Promise(resolve => resolve((badRequest(new MissingParamError('Password')))))
        }
        return {
            statuscode: 200,
            body: {
                ok: 'ok'
            }
        }
    }
}
