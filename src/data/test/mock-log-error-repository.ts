import type { LogErrorRepository } from "../protocols/db/log/log-error-repository"

export const mockLogErrorRepository = (): LogErrorRepository => {
    class LogErrorRepositoryStub implements LogErrorRepository {
        async logError (stackError: string): Promise<void> {
            await new Promise(resolve => resolve(stackError))
        }
    }
    return new LogErrorRepositoryStub()
}
