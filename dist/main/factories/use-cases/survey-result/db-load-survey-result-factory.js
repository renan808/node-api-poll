"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDbLoadSurveyResult = void 0;
const survey_result_mongo_repository_1 = require("@/infra/db/mongo-db/survey-result/survey-result-mongo-repository");
const db_load_survey_result_1 = require("@/data/use-cases/survey-result/load-survey-result/db-load-survey-result");
const makeDbLoadSurveyResult = () => {
    const surveyResultMongoRepository = new survey_result_mongo_repository_1.SurveyResultMongoRepository();
    return new db_load_survey_result_1.DbLoadSurveyResult(surveyResultMongoRepository);
};
exports.makeDbLoadSurveyResult = makeDbLoadSurveyResult;
//# sourceMappingURL=db-load-survey-result-factory.js.map