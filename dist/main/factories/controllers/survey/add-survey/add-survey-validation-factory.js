"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeAddSurveyValidation = void 0;
const index_1 = require("@/validation/validators/index");
const makeAddSurveyValidation = () => {
    const validations = [];
    for (const field of ['question', 'answers']) {
        validations.push(new index_1.RequiredFieldValidation(field));
    }
    return new index_1.ValidationComposite(validations);
};
exports.makeAddSurveyValidation = makeAddSurveyValidation;
//# sourceMappingURL=add-survey-validation-factory.js.map