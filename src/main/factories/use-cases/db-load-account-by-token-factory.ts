import { DbLoadAccountByToken } from "@/data/usecases/account/load-account-by-token/db-load-account-by-token"
import type { LoadAccountByToken } from "@/domain/use-cases/account/load-account-by-token"
import { JwtAdapter } from "@/infra/cryptograpy/jwt-adapter/jwt-adapter"
import { AccountMongoRepository } from "@/infra/db/mongo-db/account-repository/account-mongo-repository"
import env from "@/main/config/env"
export const makeDbLoadAccountBytoken = (): LoadAccountByToken => {
    const loadAccountByTokenRepository = new AccountMongoRepository()
    const decryptRepository = new JwtAdapter(env.jwtSecret)
    return new DbLoadAccountByToken(loadAccountByTokenRepository, decryptRepository)
}
