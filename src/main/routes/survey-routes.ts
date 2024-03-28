import type { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeAddSurveyController } from '../factories/controllers/survey/add-survey/add-survey-controller-factory'
import { adaptMiddleware } from '../adapters/express-middleware-adapter'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware-factory'
import { makeLoadSurveysController } from '../factories/controllers/survey/load-survey/load-surveys-controller-factory'
export default (router: Router): void => {
    const adminAuth = adaptMiddleware(makeAuthMiddleware('admin'))
    const Auth = adaptMiddleware(makeAuthMiddleware('user'))
    router.post('/surveys', adminAuth, adaptRoute(makeAddSurveyController()))
    router.get('/surveys', Auth, adaptRoute(makeLoadSurveysController()))
}
