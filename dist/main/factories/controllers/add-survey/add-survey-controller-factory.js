"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeAddSurveyController = void 0;
const add_survey_controller_1 = require("../../../../presentation/controllers/survey/add-survey/add-survey-controller");
const log_controller_decorator_1 = require("../../../decorators/log-controller-decorator");
const log_mongo_repository_1 = require("../../../../infra/db/mongo-db/log/log-mongo-repository");
const add_survey_validation_factory_1 = require("./add-survey-validation-factory");
const survey_mongo_repository_1 = require("../../../../infra/db/mongo-db/survey/survey-mongo-repository");
const makeAddSurveyController = () => {
    const addSurveyController = new add_survey_controller_1.AddSurveyController((0, add_survey_validation_factory_1.makeAddSurveyValidation)(), new survey_mongo_repository_1.SurveyMongoRepository());
    const logMongoRepository = new log_mongo_repository_1.LogMongoRepository();
    return new log_controller_decorator_1.LogControllerDecorator(addSurveyController, logMongoRepository);
};
exports.makeAddSurveyController = makeAddSurveyController;
//# sourceMappingURL=add-survey-controller-factory.js.map