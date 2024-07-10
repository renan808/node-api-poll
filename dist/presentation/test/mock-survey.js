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
exports.mockLoadSurveyById = exports.mockLoadSurveys = exports.mockRequest = exports.mockAddSurvey = void 0;
const test_1 = require("@/domain/test");
const mockAddSurvey = () => {
    class AddSurveyStub {
        add(data) {
            return __awaiter(this, void 0, void 0, function* () {
            });
        }
    }
    return new AddSurveyStub();
};
exports.mockAddSurvey = mockAddSurvey;
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
const mockLoadSurveys = () => {
    class LoadSurveyStub {
        loadAll() {
            return __awaiter(this, void 0, void 0, function* () {
                return (0, test_1.mockSurveysModel)();
            });
        }
    }
    return new LoadSurveyStub();
};
exports.mockLoadSurveys = mockLoadSurveys;
const mockLoadSurveyById = () => {
    class LoadSurveyByIdStub {
        loadById(id) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield Promise.resolve((0, test_1.mockSurveyModel)());
            });
        }
    }
    return new LoadSurveyByIdStub();
};
exports.mockLoadSurveyById = mockLoadSurveyById;
//# sourceMappingURL=mock-survey.js.map