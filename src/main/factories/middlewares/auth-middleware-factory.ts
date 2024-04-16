import type { Middleware } from "@/presentation/protocols"
import { AuthMiddleware } from "@/presentation/middlewares/auth-middleware"
import { makeDbLoadAccountBytoken } from "../use-cases/db-load-account-by-token-factory"
export const makeAuthMiddleware = (role?: string): Middleware => {
    return new AuthMiddleware(makeDbLoadAccountBytoken(), role)
}
