import { adaptMiddleware } from "../adapters/express-middleware-adapter"
import { makeAuthMiddleware } from "../factories/middlewares/auth-middleware-factory"

export const userAuth = adaptMiddleware(makeAuthMiddleware())
export const AdminAuth = adaptMiddleware(makeAuthMiddleware('admin'))
