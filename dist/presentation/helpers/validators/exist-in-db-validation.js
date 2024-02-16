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
exports.ExistInDB = void 0;
const mongo_helper_1 = require("../../../infra/db/mongo-db/helpers/mongo-helper");
const errors_1 = require("../../errors");
class ExistInDB {
    validate(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const accountCollection = yield mongo_helper_1.Mongohelper.getCollection('accounts');
            const account = yield accountCollection.findOne({ email: input.email });
            if (account) {
                return new errors_1.InvalidParamError('Email already exists');
            }
        });
    }
}
exports.ExistInDB = ExistInDB;
//# sourceMappingURL=exist-in-db-validation.js.map