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
exports.mockserverError = exports.mockRequest = exports.mockController = void 0;
const http_helper_1 = require("@/presentation/helpers/http/http-helper");
const test_1 = require("@/domain/test");
const mockController = () => {
    class ControllerStub {
        handle(httpRequest) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield Promise.resolve((0, http_helper_1.ok)((0, test_1.mockAccountModel)()));
            });
        }
    }
    return new ControllerStub();
};
exports.mockController = mockController;
const mockRequest = () => ({
    body: {
        email: 'any_email@email.com',
        name: 'any_name',
        password: 'any_password',
        password_confirm: 'any_password'
    }
});
exports.mockRequest = mockRequest;
const mockserverError = () => {
    const fakeError = new Error();
    fakeError.stack = 'any_stack';
    return (0, http_helper_1.serverError)(fakeError);
};
exports.mockserverError = mockserverError;
//# sourceMappingURL=mock-log-controller-decorator.js.map