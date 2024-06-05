"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDbLoadSurveyById = void 0;
const survey_mongo_repository_1 = require("@/infra/db/mongo-db/survey/survey-mongo-repository");
const db_load_survey_by_id_1 = require("@/data/usecases/survey/load-survey-by-id/db-load-survey-by-id");
const makeDbLoadSurveyById = () => {
    return new db_load_survey_by_id_1.DbLoadSurveyById(new survey_mongo_repository_1.SurveyMongoRepository());
};
exports.makeDbLoadSurveyById = makeDbLoadSurveyById;
//# sourceMappingURL=db-load-survey-by-id-factory.js.map