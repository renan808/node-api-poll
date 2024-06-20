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
exports.mockSaveSurveyResultRepository = exports.mockSurveyResult = exports.mockLoadSurveyByIdRepository = exports.mockAddSurveyRepository = void 0;
const mock_save_survey_model_1 = require("@/domain/test/mock-save-survey-model");
const test_1 = require("@/domain/test");
const mockAddSurveyRepository = () => {
    class AddsurveyRepositoryStub {
        add(data) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield Promise.resolve();
            });
        }
    }
    return new AddsurveyRepositoryStub();
};
exports.mockAddSurveyRepository = mockAddSurveyRepository;
const mockLoadSurveyByIdRepository = () => {
    class LoadSurveyByIdRepositoryStub {
        loadById(id) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield Promise.resolve((0, test_1.mockSurveyModel)());
            });
        }
    }
    return new LoadSurveyByIdRepositoryStub();
};
exports.mockLoadSurveyByIdRepository = mockLoadSurveyByIdRepository;
const mockSurveyResult = () => Object.assign({}, (0, mock_save_survey_model_1.mockSurveyResultData)(), { id: 'any_id' });
exports.mockSurveyResult = mockSurveyResult;
const mockSaveSurveyResultRepository = () => {
    class SaveSurveyResultRepository {
        save(data) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield Promise.resolve((0, exports.mockSurveyResult)());
            });
        }
    }
    return new SaveSurveyResultRepository();
};
exports.mockSaveSurveyResultRepository = mockSaveSurveyResultRepository;
//# sourceMappingURL=mock-db-survey.js.map