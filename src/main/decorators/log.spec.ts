import type { Controller, httpRequest, httpResponse } from '../../presentation/protocols'
import { LogControllerDecorator } from './log'
import type { LogErrorRepository } from '../../data/protocols/log-error-repository'
import { ok, serverError } from '../../presentation/helpers/http-helper'
import type { AccountModel } from '../../domain/models/account'

const makeController = (): Controller => {
    class ControllerStub implements Controller {
        async handle (httpRequest: httpRequest): Promise<httpResponse> {
            return await new Promise(resolve => resolve(ok(makeFakeAccount())))
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

const makeFakeRequest = (): httpRequest => ({
    body: {
      email: 'any_email@email.com',
      name: 'any_name',
      password: 'any_password',
      password_confirm: 'any_password'
    }
  })
const makeFakeserverError = (): httpResponse => {
    const fakeError = new Error()
    fakeError.stack = 'any_stack'
    return serverError(fakeError)
}

const makeFakeAccount = (): AccountModel => ({
    id: 'valid_id',
    email: 'valid_email@email.com',
    name: 'valid_name',
    password: 'valid_password'
  })

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
        const handleSpy = jest.spyOn(controllerStub, 'handle')
        await sut.handle(makeFakeRequest())
        expect(handleSpy).toHaveBeenCalledWith(makeFakeRequest())
    })

    test('Should return the same result of the controller', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(ok(makeFakeAccount()))
    })

    test('Should call LogErrorRepository with correct Error if Controller returns a Server Error', async () => {
        const { sut, controllerStub, logErrorRepositoryStub } = makeSut()
        const LogSpy = jest.spyOn(logErrorRepositoryStub, 'log')
        const error = makeFakeserverError()
        jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(new Promise(resolve => resolve(error)))
        await sut.handle(makeFakeRequest())
        expect(LogSpy).toHaveBeenCalledWith('any_stack')
    })
})
