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
exports.SaveSurveyResultController = void 0;
const http_helper_1 = require("@/presentation/helpers/http/http-helper");
const errors_1 = require("@/presentation/errors");
class SaveSurveyResultController {
    constructor(loadSurveyById, saveSurveyResult) {
        this.loadSurveyById = loadSurveyById;
        this.saveSurveyResult = saveSurveyResult;
    }
    handle(httpRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.loadSurveyById.loadById(httpRequest.params.surveyId);
                const { answer } = httpRequest.body;
                const accountId = httpRequest.accountId;
                if (data) {
                    const answers = data.answers.map(a => a.answer);
                    if (!answers.includes(answer)) {
                        return (0, http_helper_1.forbidden)(new errors_1.InvalidParamError('answer'));
                    }
                }
                else {
                    return (0, http_helper_1.forbidden)(new errors_1.InvalidParamError('surveyId'));
                }
                const res = yield this.saveSurveyResult.save({
                    surveyId: data.id,
                    date: new Date(),
                    accountId,
                    answer
                });
                return yield new Promise(resolve => resolve((0, http_helper_1.ok)(res)));
            }
            catch (error) {
                console.log(error);
                return (0, http_helper_1.serverError)(error);
            }
        });
    }
}
exports.SaveSurveyResultController = SaveSurveyResultController;
//# sourceMappingURL=save-survey-result-controller.js.map