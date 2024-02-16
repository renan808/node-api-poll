"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeSignUpValidation = void 0;
const index_1 = require("../../../../presentation/helpers/validators/index");
const email_validator_adapter_1 = require("../../../../utils/email-validator-adapter");
const exist_in_db_validation_1 = require("../../../../presentation/helpers/validators/exist-in-db-validation");
const makeSignUpValidation = () => {
    const validations = [];
    for (const field of ['name', 'email', 'password', 'password_confirm']) {
        validations.push(new index_1.RequiredFieldValidation(field));
    }
    const compareFieldValidation = new index_1.CompareFieldValidation('password', 'password_confirm');
    validations.push(compareFieldValidation);
    validations.push(new index_1.EmailValidation('email', new email_validator_adapter_1.EmailValidatorAdapter()));
    validations.push(new exist_in_db_validation_1.ExistInDB());
    return new index_1.ValidationComposite(validations);
};
exports.makeSignUpValidation = makeSignUpValidation;
//# sourceMappingURL=signup-validation-factory.js.map