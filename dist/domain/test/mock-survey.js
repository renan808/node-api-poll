"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockSurveysModel = exports.mockRequest = exports.mockSurveyModel = exports.mockSurveyResult = exports.mockAddSurveyParams = void 0;
const mockAddSurveyParams = () => ({
    question: 'any_question',
    answers: [{
            image: 'any_image',
            answer: 'any_answer'
        }],
    date: new Date()
});
exports.mockAddSurveyParams = mockAddSurveyParams;
const mockSurveyResult = () => ({
    surveyId: 'any_survey_id',
    question: 'any_question',
    answers: [{
            image: 'any_image',
            count: 1,
            percent: 20,
            answer: 'any_answer'
        }, {
            image: 'any_image',
            count: 10,
            percent: 80,
            answer: 'any_answer'
        }],
    date: new Date()
});
exports.mockSurveyResult = mockSurveyResult;
const mockSurveyModel = () => {
    return {
        id: 'any_survey_id',
        question: 'any_question1',
        answers: [{
                image: 'any_img',
                answer: 'any_answer'
            }],
        date: new Date()
    };
};
exports.mockSurveyModel = mockSurveyModel;
const mockRequest = () => ({
    body: {
        question: 'any_question',
        answers: [{
                image: 'any_image',
                answer: 'any_answer'
            }],
        date: new Date()
    }
});
exports.mockRequest = mockRequest;
const mockSurveysModel = () => {
    return [{
            id: 'any_id',
            question: 'any_question1',
            answers: [{
                    image: 'any_img',
                    answer: 'any_answer'
                }],
            date: new Date()
        }, {
            id: 'any_id',
            question: 'any_question2',
            answers: [{
                    image: 'any_img',
                    answer: 'any_answer'
                }],
            date: new Date()
        }
    ];
};
exports.mockSurveysModel = mockSurveysModel;
//# sourceMappingURL=mock-survey.js.map