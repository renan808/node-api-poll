"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidParamError = exports.throwError = void 0;
__exportStar(require("../../protocols"), exports);
__exportStar(require("@/domain/use-cases/survey/load-survey-by-id"), exports);
__exportStar(require("@/domain/models/survey"), exports);
__exportStar(require("@/domain/use-cases/survey-result/save-survey-result"), exports);
__exportStar(require("@/domain/models/survey-result"), exports);
__exportStar(require("@/presentation/helpers/http/http-helper"), exports);
var tests_helpers_1 = require("@/domain/test/tests-helpers");
Object.defineProperty(exports, "throwError", { enumerable: true, get: function () { return tests_helpers_1.throwError; } });
var errors_1 = require("@/presentation/errors");
Object.defineProperty(exports, "InvalidParamError", { enumerable: true, get: function () { return errors_1.InvalidParamError; } });
__exportStar(require("./save-survey-result-controller"), exports);
//# sourceMappingURL=save-survey-result-protocol.js.map