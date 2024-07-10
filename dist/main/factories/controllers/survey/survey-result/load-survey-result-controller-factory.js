"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeLoadSurveyResultController = void 0;
const log_mongo_repository_1 = require("@/infra/db/mongo-db/log/log-mongo-repository");
const log_controller_decorator_1 = require("@/main/decorators/log-controller-decorator");
const load_survey_result_controller_1 = require("@/presentation/controllers/load-survey-result/load-survey-result-controller");
const db_load_survey_result_factory_1 = require("@/main/factories/use-cases/survey-result/db-load-survey-result-factory");
const db_load_survey_by_id_factory_1 = require("@/main/factories/use-cases/survey/db-load-survey-by-id-factory");
const makeLoadSurveyResultController = () => {
    const loadSurveyResultController = new load_survey_result_controller_1.LoadSurveyResultController((0, db_load_survey_result_factory_1.makeDbLoadSurveyResult)(), (0, db_load_survey_by_id_factory_1.makeDbLoadSurveyById)());
    const logMongoRepository = new log_mongo_repository_1.LogMongoRepository();
    return new log_controller_decorator_1.LogControllerDecorator(loadSurveyResultController, logMongoRepository);
};
exports.makeLoadSurveyResultController = makeLoadSurveyResultController;
//# sourceMappingURL=load-survey-result-controller-factory.js.map