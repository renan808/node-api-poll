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
exports.LoadSurveyResultController = void 0;
const save_survey_result_protocol_1 = require("../save-survey/save-survey-result-protocol");
class LoadSurveyResultController {
    constructor(loadSurveyResult, loadSurveyById) {
        this.loadSurveyResult = loadSurveyResult;
        this.loadSurveyById = loadSurveyById;
    }
    handle(httpRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(httpRequest);
            try {
                // fazer duas verificação 1 pra ver se o surveyId é valido e outra pra ver se o surveyResult retorna null msm com um surveyId valido retorna 204
                const survey = yield this.loadSurveyById.loadById(httpRequest.params.surveyId);
                if (!survey) {
                    return (0, save_survey_result_protocol_1.forbidden)(new save_survey_result_protocol_1.InvalidParamError('surveyId'));
                }
                const surveyResult = yield this.loadSurveyResult.loadBySurveyId(httpRequest.params.surveyId);
                if (!surveyResult) {
                    return (0, save_survey_result_protocol_1.noContent)();
                }
                return (0, save_survey_result_protocol_1.ok)(surveyResult);
            }
            catch (error) {
                console.log(error);
                return (0, save_survey_result_protocol_1.serverError)(error);
            }
        });
    }
}
exports.LoadSurveyResultController = LoadSurveyResultController;
//# sourceMappingURL=load-survey-result-controller.js.map