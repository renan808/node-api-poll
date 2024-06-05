"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDbSaveSurveyResult = void 0;
const survey_result_mongo_repository_1 = require("@/infra/db/mongo-db/survey-result/survey-result-mongo-repository");
const db_save_survey_result_1 = require("@/data/usecases/survey-result/save-survey-result/db-save-survey-result");
const makeDbSaveSurveyResult = () => {
    const surveyResultMongoRepository = new survey_result_mongo_repository_1.SurveyResultMongoRepository();
    return new db_save_survey_result_1.DbSaveSurveyResult(surveyResultMongoRepository);
};
exports.makeDbSaveSurveyResult = makeDbSaveSurveyResult;
//# sourceMappingURL=db-save-survey-result-factory.js.map