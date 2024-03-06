"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_route_adapter_1 = require("../adapters/express-route-adapter");
const add_survey_controller_factory_1 = require("../factories/controllers/add-survey/add-survey-controller-factory");
exports.default = (router) => {
    router.post('/add-surveys', (0, express_route_adapter_1.adaptRoute)((0, add_survey_controller_factory_1.makeAddSurveyController)()));
};
//# sourceMappingURL=survey-routes.js.map