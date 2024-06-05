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
const mongodb_1 = require("mongodb");
class SurveyMongoRepository {
    add(surveyData) {
        return __awaiter(this, void 0, void 0, function* () {
            const surveyCollection = yield mongo_helper_1.Mongohelper.getCollection('surveys');
            yield surveyCollection.insertOne(surveyData);
        });
    }
    loadAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const surveyCollection = yield mongo_helper_1.Mongohelper.getCollection('surveys');
            const surveys = yield surveyCollection.find().toArray();
            return mongo_helper_1.Mongohelper.mapCollection(surveys);
        });
    }
    loadById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const surveyCollection = yield mongo_helper_1.Mongohelper.getCollection('surveys');
            const survey = yield surveyCollection.findOne({ _id: new mongodb_1.ObjectId(id) });
            return mongo_helper_1.Mongohelper.map(survey);
        });
    }
}
exports.SurveyMongoRepository = SurveyMongoRepository;
//# sourceMappingURL=survey-mongo-repository.js.map