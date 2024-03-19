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
exports.DbLoadAccountByToken = void 0;
class DbLoadAccountByToken {
    constructor(loadAccountByTokenRepository, decrypter) {
        this.loadAccountByTokenRepository = loadAccountByTokenRepository;
        this.decrypter = decrypter;
    }
    load(acessToken, role) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield this.decrypter.decrypt(acessToken);
            if (token) {
                const account = yield this.loadAccountByTokenRepository.loadByToken(acessToken, role);
                if (account) {
                    return account;
                }
            }
            return null;
        });
    }
}
exports.DbLoadAccountByToken = DbLoadAccountByToken;
//# sourceMappingURL=db-load-account-by-token.js.map