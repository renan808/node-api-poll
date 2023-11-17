import type { httpResponse, httpRequest, Controller, EmailValidator } from '../protocols'
import { MissingParamError, InvalidParamError } from '../errors/'
import { badRequest, serverError } from '../helpers/http-helper'
import type { AddAccount } from '../../domain/use-cases/add-account'

export class SignUpController implements Controller {
    private readonly emailValidator: EmailValidator
    private readonly AddAccount: AddAccount
    constructor (emailValidator: EmailValidator, AddAccountx: AddAccount) {
        this.emailValidator = emailValidator
        this.AddAccount = AddAccountx
    }

    handle (httpRequest: httpRequest): httpResponse {
        try {
            const requiredFields = ['name', 'password', 'email', 'password_confirm']
            const password = httpRequest.body.password
            const email = httpRequest.body.email
            const password_confirm = httpRequest.body.password_confirm
            const name = httpRequest.body.name
            this.AddAccount.add({
                name,
                email,
                password
            })
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
            return {
            body: httpRequest,
            statuscode: 200
            }
        } catch {
            return serverError()
        }
    }
}
