import type { Controller, httpRequest, httpResponse } from '../../presentation/protocols'
import { LogControllerDecorator } from './log'

describe('SignUp Controller', () => {
    test('Should Call controller handle', async () => {
        class ControllerStub implements Controller {
            async handle (httpRequest: httpRequest): Promise<httpResponse> {
                const httpResponse: httpResponse = {
                    body: {
                        name: 'renan',
                        email: 'renan@renan.com',
                        password: '123',
                        password_confirm: '123'
                    },
                    statuscode: 200
                }
                return await new Promise(resolve => resolve(httpResponse))
            }
        }
        const controllerStub = new ControllerStub()
        const sut = new LogControllerDecorator(controllerStub)
        const handleSpy = jest.spyOn(controllerStub, 'handle')
        const httpRequest: httpRequest = {
            body: {
                name: 'renan',
                email: 'renan@renan.com',
                password: '123',
                password_confirm: '123'
            }
        }
        await sut.handle(httpRequest)
        expect(handleSpy).toHaveBeenCalledWith(httpRequest)
    })
})
