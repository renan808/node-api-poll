import type { Controller, httpRequest, httpResponse } from '../../presentation/protocols'
import { LogControllerDecorator } from './log'

const makeController = (): Controller => {
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
    return new ControllerStub()
}

interface SutTypes {
    sut: LogControllerDecorator
    controllerStub: Controller
}

const makeSut = (): SutTypes => {
    const controllerStub = makeController()
    const sut = new LogControllerDecorator(controllerStub)
    return {
        sut,
        controllerStub
    }
}

describe('SignUp Controller', () => {
    test('Should Call controller handle', async () => {
        const { sut, controllerStub } = makeSut()
        const httpRequest: httpRequest = {
            body: {
                name: 'renan',
                email: 'renan@renan.com',
                password: '123',
                password_confirm: '123'
            }
        }
        const handleSpy = jest.spyOn(controllerStub, 'handle')
        await sut.handle(httpRequest)
        expect(handleSpy).toHaveBeenCalledWith(httpRequest)
    })
})
