"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeLoadSurveysController = void 0;
const load_surveys_protocols_1 = require("@/presentation/controllers/survey/load-survey/load-surveys-protocols");
const log_mongo_repository_1 = require("@/infra/db/mongo-db/log/log-mongo-repository");
const log_controller_decorator_1 = require("@/main/decorators/log-controller-decorator");
const survey_mongo_repository_1 = require("@/infra/db/mongo-db/survey/survey-mongo-repository");
const makeLoadSurveysController = () => {
    const loadSurveysController = new load_surveys_protocols_1.LoadSurveysController(new survey_mongo_repository_1.SurveyMongoRepository());
    const logMongoRepository = new log_mongo_repository_1.LogMongoRepository();
    return new log_controller_decorator_1.LogControllerDecorator(loadSurveysController, logMongoRepository);
};
exports.makeLoadSurveysController = makeLoadSurveysController;
//# sourceMappingURL=load-surveys-controller-factory.js.map