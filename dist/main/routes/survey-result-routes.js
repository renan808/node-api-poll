"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_route_adapter_1 = require("../adapters/express-route-adapter");
const auth_1 = require("../middlewares/auth");
const save_survey_result_controller_factory_1 = require("../factories/controllers/survey/survey-result/save-survey-result-controller-factory");
const load_survey_result_controller_factory_1 = require("../factories/controllers/survey/survey-result/load-survey-result-controller-factory");
exports.default = (router) => {
    router.put('/surveys/:surveyId/results', auth_1.userAuth, (0, express_route_adapter_1.adaptRoute)((0, save_survey_result_controller_factory_1.makeSaveSurveyResultController)()));
    router.get('/surveys/:surveyId/results', auth_1.userAuth, (0, express_route_adapter_1.adaptRoute)((0, load_survey_result_controller_factory_1.makeLoadSurveyResultController)()));
};
//# sourceMappingURL=survey-result-routes.js.map