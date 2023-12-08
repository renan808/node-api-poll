import { serverError } from '../../presentation/helpers/http-helper'
import type { Controller, httpRequest, httpResponse } from '../../presentation/protocols'
import { LogControllerDecorator } from './log'
import type { LogErrorRepository } from '../../data/protocols/log-error-repository'
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
            return httpResponse
        }
    }
    return new ControllerStub()
}

const makeLogErrorRepository = (): LogErrorRepository => {
    class LogErrorRepositoryStub implements LogErrorRepository {
        async log (stackError: string): Promise<void> {
            return await new Promise(resolve => resolve())
        }
    }
    return new LogErrorRepositoryStub()
}

interface SutTypes {
    sut: LogControllerDecorator
    controllerStub: Controller
    logErrorRepositoryStub: LogErrorRepository
}

const makeSut = (): SutTypes => {
    const controllerStub = makeController()
    const logErrorRepositoryStub = makeLogErrorRepository()
    const sut = new LogControllerDecorator(controllerStub, logErrorRepositoryStub)
    return {
        sut,
        controllerStub,
        logErrorRepositoryStub
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

    test('Should return the same result of the controller', async () => {
        const { sut } = makeSut()
        const httpRequest: httpRequest = {
            body: {
                name: 'renan',
                email: 'renan@renan.com',
                password: '123',
                password_confirm: '123'
            }
        }
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual({
            body: {
                name: 'renan',
                email: 'renan@renan.com',
                password: '123',
                password_confirm: '123'
            },
            statuscode: 200
        })
    })

    test('Should call LogErrorRepository with correct Error if Controller returns a Server Error', async () => {
        const { sut, controllerStub, logErrorRepositoryStub } = makeSut()
        const fakeError = new Error()
        fakeError.stack = 'any_stack'
        const error = serverError(fakeError)
        const LogSpy = jest.spyOn(logErrorRepositoryStub, 'log')
        jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(new Promise(resolve => resolve(error)))
        const httpRequest: httpRequest = {
            body: {
                name: 'renan',
                email: 'renan@renan.com',
                password: '123',
                password_confirm: '123'
            }
        }
        await sut.handle(httpRequest)
        expect(LogSpy).toHaveBeenCalledWith('any_stack')
    })
})
