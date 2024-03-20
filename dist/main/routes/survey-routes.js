"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_route_adapter_1 = require("../adapters/express-route-adapter");
const add_survey_controller_factory_1 = require("../factories/controllers/survey/add-survey/add-survey-controller-factory");
const express_middleware_adapter_1 = require("../adapters/express-middleware-adapter");
const auth_middleware_factory_1 = require("../factories/middlewares/auth-middleware-factory");
exports.default = (router) => {
    const authAdmin = (0, express_middleware_adapter_1.adaptMiddleware)((0, auth_middleware_factory_1.makeAuthMiddleware)('admin'));
    router.post('/add-surveys', authAdmin, (0, express_route_adapter_1.adaptRoute)((0, add_survey_controller_factory_1.makeAddSurveyController)()));
};
//# sourceMappingURL=survey-routes.js.map