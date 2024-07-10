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
exports.mockLoadSurveyResultRepository = exports.mockSaveSurveyResultRepository = exports.mockLoadSurveyByIdRepository = exports.mockAddSurveyRepository = void 0;
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
const mockSaveSurveyResultRepository = () => {
    class SaveSurveyResultRepositoryStub {
        save(data) {
            return __awaiter(this, void 0, void 0, function* () {
                yield Promise.resolve((0, test_1.mockSurveyResult)());
            });
        }
    }
    return new SaveSurveyResultRepositoryStub();
};
exports.mockSaveSurveyResultRepository = mockSaveSurveyResultRepository;
const mockLoadSurveyResultRepository = () => {
    class LoadSurveyResultRepositoryStub {
        loadBySurveyId(surveyId) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield Promise.resolve((0, test_1.mockSurveyResult)());
            });
        }
    }
    return new LoadSurveyResultRepositoryStub();
};
exports.mockLoadSurveyResultRepository = mockLoadSurveyResultRepository;
//# sourceMappingURL=mock-db-survey.js.map