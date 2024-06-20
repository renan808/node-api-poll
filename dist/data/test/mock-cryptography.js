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
exports.mockAuthentication = exports.mockUpdateAcessTokenRepository = exports.mockHashComparer = exports.mockEncrypter = exports.mockHasher = exports.mockDecrypter = void 0;
const mockDecrypter = () => {
    class DecrypterSutb {
        decrypt(value) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield Promise.resolve('any_value');
            });
        }
    }
    return new DecrypterSutb();
};
exports.mockDecrypter = mockDecrypter;
const mockHasher = () => {
    class HasherStub {
        hash(value) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield new Promise(resolve => {
                    resolve('hashed_password');
                });
            });
        }
    }
    return new HasherStub();
};
exports.mockHasher = mockHasher;
const mockEncrypter = () => {
    class EncrypterStub {
        encrypt(id) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield Promise.resolve('any_token');
            });
        }
    }
    return new EncrypterStub();
};
exports.mockEncrypter = mockEncrypter;
const mockHashComparer = () => {
    class HashComparerStub {
        compare(password, hash) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield Promise.resolve(true);
            });
        }
    }
    return new HashComparerStub();
};
exports.mockHashComparer = mockHashComparer;
const mockUpdateAcessTokenRepository = () => {
    class UpdateAcessTokenRepositoryStub {
        updateToken(id, token) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield Promise.resolve();
            });
        }
    }
    return new UpdateAcessTokenRepositoryStub();
};
exports.mockUpdateAcessTokenRepository = mockUpdateAcessTokenRepository;
const mockAuthentication = () => ({
    email: 'any_email@email.com',
    password: 'any_password'
});
exports.mockAuthentication = mockAuthentication;
//# sourceMappingURL=mock-cryptography.js.map