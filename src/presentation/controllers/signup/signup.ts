import type { httpResponse, httpRequest, Controller, EmailValidator, AddAccount, Validation } from './signup-protocols'
import { badRequest, serverError, ok } from '../../helpers/http-helper'

export class SignUpController implements Controller {
    private readonly emailValidator: EmailValidator
    private readonly addAccount: AddAccount
    private readonly validation: Validation
    constructor (AddAccount: AddAccount, Validation: Validation) {
        this.validation = Validation
        this.addAccount = AddAccount
    }

    async handle (httpRequest: httpRequest): Promise<httpResponse> {
        try {
            const error = this.validation.validate(httpRequest.body)
            if (error) {
                return badRequest(error)
            }
            const { name, password, email } = httpRequest.body
            const account = await this.addAccount.add({
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
