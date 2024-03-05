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
exports.SurveyMongoRepository = void 0;
const mongo_helper_1 = require("../helpers/mongo-helper");
class SurveyMongoRepository {
    add(surveyData) {
        return __awaiter(this, void 0, void 0, function* () {
            const surveyCollection = yield mongo_helper_1.Mongohelper.getCollection('Surveys');
            yield surveyCollection.insertOne(surveyData);
        });
    }
}
exports.SurveyMongoRepository = SurveyMongoRepository;
//# sourceMappingURL=survey-mongo-repository.js.map