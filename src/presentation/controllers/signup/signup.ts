import type { httpResponse, httpRequest, Controller, EmailValidator, AddAccount } from './signup-protocols'
import { MissingParamError, InvalidParamError } from '../../errors'
import { badRequest, serverError, ok } from '../../helpers/http-helper'

export class SignUpController implements Controller {
    private readonly emailValidator: EmailValidator
    private readonly AddAccount: AddAccount
    constructor (emailValidator: EmailValidator, AddAccount: AddAccount) {
        this.emailValidator = emailValidator
        this.AddAccount = AddAccount
    }

    async handle (httpRequest: httpRequest): Promise<httpResponse> {
        try {
            const requiredFields = ['name', 'password', 'email', 'password_confirm']
            const password = httpRequest.body.password
            const email = httpRequest.body.email
            const password_confirm = httpRequest.body.password_confirm
            const name = httpRequest.body.name
            for (const field of requiredFields) {
                if (!httpRequest.body[field]) {
                    return badRequest(new MissingParamError(field))
                }
            }
            if (password !== password_confirm) {
                return badRequest(new InvalidParamError('password_confirm'))
            }
            const isValid = this.emailValidator.isValid(email)
            if (!isValid) {
                return badRequest(new InvalidParamError('email'))
            }
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
