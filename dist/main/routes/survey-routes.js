"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_route_adapter_1 = require("../adapters/express-route-adapter");
const add_survey_controller_factory_1 = require("../factories/controllers/survey/add-survey/add-survey-controller-factory");
const load_surveys_controller_factory_1 = require("../factories/controllers/survey/load-survey/load-surveys-controller-factory");
const auth_1 = require("../middlewares/auth");
exports.default = (router) => {
    router.post('/surveys', auth_1.AdminAuth, (0, express_route_adapter_1.adaptRoute)((0, add_survey_controller_factory_1.makeAddSurveyController)()));
    router.get('/surveys', auth_1.userAuth, (0, express_route_adapter_1.adaptRoute)((0, load_surveys_controller_factory_1.makeLoadSurveysController)()));
};
//# sourceMappingURL=survey-routes.js.map