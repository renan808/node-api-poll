import type { httpResponse, httpRequest, Controller, EmailValidator, AddAccount, Validation } from './signup-protocols'
import { InvalidParamError } from '../../errors'
import { badRequest, serverError, ok } from '../../helpers/http-helper'

export class SignUpController implements Controller {
    private readonly emailValidator: EmailValidator
    private readonly addAccount: AddAccount
    private readonly validation: Validation
    constructor (emailValidator: EmailValidator, AddAccount: AddAccount, Validation: Validation) {
        this.validation = Validation
        this.emailValidator = emailValidator
        this.addAccount = AddAccount
    }

    async handle (httpRequest: httpRequest): Promise<httpResponse> {
        try {
            const error = this.validation.validate(httpRequest.body)
            if (error) {
                return badRequest(error)
            }
            const password = httpRequest.body.password
            const email = httpRequest.body.email
            const password_confirm = httpRequest.body.password_confirm
            const name = httpRequest.body.name
            if (password !== password_confirm) {
                return badRequest(new InvalidParamError('password_confirm'))
            }
            const isValid = this.emailValidator.isValid(email)
            if (!isValid) {
                return badRequest(new InvalidParamError('email'))
            }
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
