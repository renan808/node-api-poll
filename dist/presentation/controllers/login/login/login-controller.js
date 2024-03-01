"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginController = void 0;
const http_helper_1 = require("../../../helpers/http/http-helper");
class LoginController {
    constructor(Authentication, Validation) {
        this.Authentication = Authentication;
        this.Validation = Validation;
    }
    handle(httpRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const error = this.Validation.validate(httpRequest.body);
                if (error) {
                    return (0, http_helper_1.badRequest)(error);
                }
                const token = yield this.Authentication.auth(httpRequest.body);
                if (token === 'unauthorized' || null) {
                    return (0, http_helper_1.unauthorized)();
                }
                return (0, http_helper_1.ok)({
                    token
                });
            }
            catch (error) {
                console.log(error);
                return (0, http_helper_1.serverError)(error);
            }
        });
    }
}
exports.LoginController = LoginController;
//# sourceMappingURL=login-controller.js.map