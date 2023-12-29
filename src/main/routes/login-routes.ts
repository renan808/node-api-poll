import type { Router } from 'express'
import { makeSignUpController } from '../factories/signup/signup-factory'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeLoginController } from '../factories/login/login-factory'
export default (router: Router): void => {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    router.post('/signup', adaptRoute(makeSignUpController()))
}
