"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const signup_factory_1 = require("../factories/controlers/signup/signup-factory");
const express_route_adapter_1 = require("../adapters/express-route-adapter");
const login_controler_factory_1 = require("../factories/controlers/login/login-controler-factory");
exports.default = (router) => {
    router.post('/signup', (0, express_route_adapter_1.adaptRoute)((0, signup_factory_1.makeSignUpController)()));
    router.post('/login', (0, express_route_adapter_1.adaptRoute)((0, login_controler_factory_1.makeLoginController)()));
};
//# sourceMappingURL=login-routes.js.map