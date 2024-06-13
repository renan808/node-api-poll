import type { LogErrorRepository } from "../protocols/db/log/log-error-repository"

export const mockLogErrorRepository = (): LogErrorRepository => {
    class LogErrorRepositoryStub implements LogErrorRepository {
        async logError (stackError: string): Promise<void> {
            await Promise.resolve(stackError)
        }
    }
    return new LogErrorRepositoryStub()
}
