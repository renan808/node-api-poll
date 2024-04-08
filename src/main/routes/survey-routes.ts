import type { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeAddSurveyController } from '../factories/controllers/survey/add-survey/add-survey-controller-factory'
import { makeLoadSurveysController } from '../factories/controllers/survey/load-survey/load-surveys-controller-factory'
import { AdminAuth, userAuth } from '../middlewares/auth'

export default (router: Router): void => {
    router.post('/surveys', AdminAuth, adaptRoute(makeAddSurveyController()))
    router.get('/surveys', userAuth, adaptRoute(makeLoadSurveysController()))
}
