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
exports.AuthMiddleware = void 0;
const index_1 = require("../errors/index");
const http_helper_1 = require("../helpers/http/http-helper");
class AuthMiddleware {
    constructor(loadAccountByToken, role) {
        this.loadAccountByToken = loadAccountByToken;
        this.role = role;
    }
    handle(httpRequest) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = (_a = httpRequest.headers) === null || _a === void 0 ? void 0 : _a['x-acess-token'];
                if (token) {
                    const account = yield this.loadAccountByToken.load(token, this.role);
                    if (account) {
                        return (0, http_helper_1.ok)({ accountId: account.id });
                    }
                }
                return (0, http_helper_1.forbidden)(new index_1.AcessDeniedError());
            }
            catch (error) {
                return (0, http_helper_1.serverError)(error);
            }
        });
    }
}
exports.AuthMiddleware = AuthMiddleware;
//# sourceMappingURL=auth-middleware.js.map