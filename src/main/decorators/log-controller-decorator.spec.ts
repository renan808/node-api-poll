import type { Controller, LogErrorRepository } from './log-controller-decorator-protocols'
import { LogControllerDecorator, ok } from './log-controller-decorator-protocols'
import { mockAccountModel } from '@/domain/test/index'
import { mockLogErrorRepository } from '@/data/test/mock-log-error-repository'
import { mockController, mockserverError, mockRequest } from './test/mock-log-controller-decorator'

interface SutTypes {
    sut: LogControllerDecorator
    controllerStub: Controller
    logErrorRepositoryStub: LogErrorRepository
}

const makeSut = (): SutTypes => {
    const controllerStub = mockController()
    const logErrorRepositoryStub = mockLogErrorRepository()
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
        await sut.handle(mockRequest())
        expect(handleSpy).toHaveBeenCalledWith(mockRequest())
    })

    test('Should return the same result of the controller', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle(mockRequest())
        expect(httpResponse).toEqual(ok(mockAccountModel()))
    })

    test('Should call LogErrorRepository with correct Error if Controller returns a Server Error', async () => {
        const { sut, controllerStub, logErrorRepositoryStub } = makeSut()
        const LogSpy = jest.spyOn(logErrorRepositoryStub, 'logError')
        const error = mockserverError()
        jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(Promise.resolve(error))
        await sut.handle(mockRequest())
        expect(LogSpy).toHaveBeenCalledWith('any_stack')
    })
})
