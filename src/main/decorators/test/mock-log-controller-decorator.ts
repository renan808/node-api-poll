import type { Controller, httpRequest, httpResponse } from "@/presentation/protocols"
import { serverError, ok } from "@/presentation/helpers/http/http-helper"
import { mockAccountModel } from "@/domain/test"

export const mockController = (): Controller => {
    class ControllerStub implements Controller {
        async handle (httpRequest: httpRequest): Promise<httpResponse> {
            return await Promise.resolve(ok(mockAccountModel()))
        }
    }
    return new ControllerStub()
}

export const mockRequest = (): httpRequest => ({
    body: {
      email: 'any_email@email.com',
      name: 'any_name',
      password: 'any_password',
      password_confirm: 'any_password'
    }
})

export const mockserverError = (): httpResponse => {
    const fakeError = new Error()
    fakeError.stack = 'any_stack'
    return serverError(fakeError)
}
