import type { httpResponse, httpRequest, Controller, AddAccount, Validation } from './signup-controler-protocols'
import { badRequest, serverError, ok } from '../../helpers/http/http-helper'

export class SignUpController implements Controller {
    constructor (private readonly AddAccount: AddAccount, private readonly Validation: Validation) {
    }

    async handle (httpRequest: httpRequest): Promise<httpResponse> {
        try {
            const error = await this.Validation.validate(httpRequest.body)
            if (error) {
                return badRequest(error)
            }
            const { name, password, email } = httpRequest.body
            const account = await this.AddAccount.add({
                name,
                email,
                password
            })
            return ok(account)
        } catch (error) {
            return serverError(error)
        }
    }
}
