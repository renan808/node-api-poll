import type { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { userAuth } from '../middlewares/auth'
import { makeSaveSurveyResultController } from '../factories/controllers/survey/survey-result/save-survey-result-controller-factory'
import { makeLoadSurveyResultController } from '../factories/controllers/survey/survey-result/load-survey-result-controller-factory'
export default (router: Router): void => {
    router.put('/surveys/:surveyId/results', userAuth, adaptRoute(makeSaveSurveyResultController()))
    router.get('/surveys/:surveyId/results', userAuth, adaptRoute(makeLoadSurveyResultController()))
}
