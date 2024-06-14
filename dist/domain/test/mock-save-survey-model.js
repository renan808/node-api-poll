"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockRequest = exports.mockSurveyResultData = void 0;
const mockSurveyResultData = () => ({
    surveyId: 'any_survey_id',
    accountId: 'any_account_id',
    answer: 'any_answer',
    date: new Date()
});
exports.mockSurveyResultData = mockSurveyResultData;
const mockRequest = () => ({
    params: {
        surveyId: 'any_SurveyId'
    },
    body: {
        answer: 'any_answer'
    },
    accountId: 'any_accountId'
});
exports.mockRequest = mockRequest;
//# sourceMappingURL=mock-save-survey-model.js.map