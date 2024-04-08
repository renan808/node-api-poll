"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_route_adapter_1 = require("../adapters/express-route-adapter");
const add_survey_controller_factory_1 = require("../factories/controllers/survey/add-survey/add-survey-controller-factory");
const express_middleware_adapter_1 = require("../adapters/express-middleware-adapter");
const auth_middleware_factory_1 = require("../factories/middlewares/auth-middleware-factory");
const load_surveys_controller_factory_1 = require("../factories/controllers/survey/load-survey/load-surveys-controller-factory");
exports.default = (router) => {
    const adminAuth = (0, express_middleware_adapter_1.adaptMiddleware)((0, auth_middleware_factory_1.makeAuthMiddleware)('admin'));
    const Auth = (0, express_middleware_adapter_1.adaptMiddleware)((0, auth_middleware_factory_1.makeAuthMiddleware)('user'));
    router.post('/surveys', adminAuth, (0, express_route_adapter_1.adaptRoute)((0, add_survey_controller_factory_1.makeAddSurveyController)()));
    router.get('/surveys', Auth, (0, express_route_adapter_1.adaptRoute)((0, load_surveys_controller_factory_1.makeLoadSurveysController)()));
};
//# sourceMappingURL=survey-routes.js.map