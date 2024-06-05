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
exports.SignUpController = void 0;
const http_helper_1 = require("@/presentation/helpers/http/http-helper");
class SignUpController {
    constructor(Validation, AddAccount, Authentication) {
        this.Validation = Validation;
        this.AddAccount = AddAccount;
        this.Authentication = Authentication;
    }
    handle(httpRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const error = this.Validation.validate(httpRequest.body);
                if (error) {
                    return (0, http_helper_1.badRequest)(error);
                }
                const { name, password, email } = httpRequest.body;
                yield this.AddAccount.add({
                    name,
                    email,
                    password
                });
                const token = yield this.Authentication.auth({ email, password });
                return (0, http_helper_1.ok)({ token });
            }
            catch (error) {
                console.log(error);
                if (error.message === 'Email already exists.') {
                    return (0, http_helper_1.badRequest)(error);
                }
                console.log(error);
                return (0, http_helper_1.serverError)(error);
            }
        });
    }
}
exports.SignUpController = SignUpController;
//# sourceMappingURL=signup-controller.js.map