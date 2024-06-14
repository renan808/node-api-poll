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
exports.mockRequest = exports.mockAuthentication = void 0;
const mockAuthentication = () => {
    class AuthenticationStub {
        auth(authentication) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield Promise.resolve('any_token');
            });
        }
    }
    return new AuthenticationStub();
};
exports.mockAuthentication = mockAuthentication;
const mockRequest = () => ({
    body: {
        email: 'any_email@email.com',
        password: 'any_password'
    }
});
exports.mockRequest = mockRequest;
//# sourceMappingURL=mock-authentication.js.map