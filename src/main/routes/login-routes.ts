import type { Router } from 'express'
import { makeSignUpController } from '../factories/controlers/signup/signup-factory'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeLoginController } from '../factories/controlers/login/login-controler-factory'
export default (router: Router): void => {
    router.post('/signup', adaptRoute(makeSignUpController()))
    router.post('/login', adaptRoute(makeLoginController()))
}
