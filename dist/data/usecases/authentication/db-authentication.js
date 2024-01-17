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
exports.DbAuthentication = void 0;
class DbAuthentication {
    constructor(LoadAccountByEmailRepository, HashComparer, Encrypter, UpdateAcessTokenRepository) {
        this.LoadAccountByEmailRepository = LoadAccountByEmailRepository;
        this.HashComparer = HashComparer;
        this.Encrypter = Encrypter;
        this.UpdateAcessTokenRepository = UpdateAcessTokenRepository;
    }
    auth(authentication) {
        return __awaiter(this, void 0, void 0, function* () {
            const account = yield this.LoadAccountByEmailRepository.loadByEmail(authentication.email);
            if (account) {
                const isValid = yield this.HashComparer.compare(authentication.password, account.password);
                if (isValid) {
                    const acessToken = yield this.Encrypter.encrypt(account.id);
                    yield this.UpdateAcessTokenRepository.updateToken(account.id, acessToken);
                    return acessToken;
                }
            }
            return 'unauthorized';
        });
    }
}
exports.DbAuthentication = DbAuthentication;
