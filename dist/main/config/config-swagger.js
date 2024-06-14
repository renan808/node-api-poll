"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const docs_1 = __importDefault(require("@/main/docs"));
const swagger_ui_express_1 = require("swagger-ui-express");
exports.default = (app) => {
    app.use('/api-docs', swagger_ui_express_1.serve, (0, swagger_ui_express_1.setup)(docs_1.default));
};
//# sourceMappingURL=config-swagger.js.map