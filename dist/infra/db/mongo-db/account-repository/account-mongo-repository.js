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
exports.AccountMongoRepository = void 0;
const mongo_helper_1 = require("../helpers/mongo-helper");
class AccountMongoRepository {
    add(accountData) {
        return __awaiter(this, void 0, void 0, function* () {
            const accountCollection = yield mongo_helper_1.Mongohelper.getCollection('accounts');
            const result = yield accountCollection.insertOne(accountData);
            const account = yield accountCollection.findOne({ _id: result.insertedId });
            return mongo_helper_1.Mongohelper.map(account);
        });
    }
    loadByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const accountCollection = yield mongo_helper_1.Mongohelper.getCollection('accounts');
            const account = yield accountCollection.findOne({ email });
            return mongo_helper_1.Mongohelper.map(account);
        });
    }
    updateToken(id, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const accountCollection = yield mongo_helper_1.Mongohelper.getCollection('accounts');
            yield accountCollection.updateOne({ _id: id }, { $set: { acessToken: token } });
        });
    }
    loadByToken(acessToken, role) {
        return __awaiter(this, void 0, void 0, function* () {
            const accountCollection = yield mongo_helper_1.Mongohelper.getCollection('accounts');
            const account = yield accountCollection.findOne({ acessToken, role });
            return mongo_helper_1.Mongohelper.map(account);
        });
    }
}
exports.AccountMongoRepository = AccountMongoRepository;
//# sourceMappingURL=account-mongo-repository.js.map