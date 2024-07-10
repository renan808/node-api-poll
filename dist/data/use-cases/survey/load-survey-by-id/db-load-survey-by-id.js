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
exports.DbLoadSurveyById = void 0;
class DbLoadSurveyById {
    constructor(loadSurveyById) {
        this.loadSurveyById = loadSurveyById;
    }
    loadById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const survey = yield this.loadSurveyById.loadById(id);
            return yield Promise.resolve(survey);
        });
    }
}
exports.DbLoadSurveyById = DbLoadSurveyById;
//# sourceMappingURL=db-load-survey-by-id.js.map