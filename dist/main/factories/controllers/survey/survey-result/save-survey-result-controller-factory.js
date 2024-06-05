"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeSaveSurveyResultController = void 0;
const log_mongo_repository_1 = require("@/infra/db/mongo-db/log/log-mongo-repository");
const log_controller_decorator_1 = require("@/main/decorators/log-controller-decorator");
const save_survey_result_controller_1 = require("@/presentation/controllers/save-survey/save-survey-result-controller");
const db_load_survey_by_id_factory_1 = require("@/main/factories/use-cases/survey/db-load-survey-by-id-factory");
const db_save_survey_result_factory_1 = require("@/main/factories/use-cases/survey-result/db-save-survey-result-factory");
const makeSaveSurveyResultController = () => {
    const saveSurveyResultController = new save_survey_result_controller_1.SaveSurveyResultController((0, db_load_survey_by_id_factory_1.makeDbLoadSurveyById)(), (0, db_save_survey_result_factory_1.makeDbSaveSurveyResult)());
    const logMongoRepository = new log_mongo_repository_1.LogMongoRepository();
    return new log_controller_decorator_1.LogControllerDecorator(saveSurveyResultController, logMongoRepository);
};
exports.makeSaveSurveyResultController = makeSaveSurveyResultController;
//# sourceMappingURL=save-survey-result-controller-factory.js.map