"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminAuth = exports.userAuth = void 0;
const express_middleware_adapter_1 = require("../adapters/express-middleware-adapter");
const auth_middleware_factory_1 = require("../factories/middlewares/auth-middleware-factory");
exports.userAuth = (0, express_middleware_adapter_1.adaptMiddleware)((0, auth_middleware_factory_1.makeAuthMiddleware)('user'));
exports.AdminAuth = (0, express_middleware_adapter_1.adaptMiddleware)((0, auth_middleware_factory_1.makeAuthMiddleware)('admin'));
//# sourceMappingURL=auth.js.map