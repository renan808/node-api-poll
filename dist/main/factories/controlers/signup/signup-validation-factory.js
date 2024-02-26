"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeSignUpValidation = void 0;
const index_1 = require("../../../../validation/validators/index");
const email_validator_adapter_1 = require("../../../../utils/email-validator-adapter");
const makeSignUpValidation = () => {
    const validations = [];
    for (const field of ['name', 'email', 'password', 'password_confirm']) {
        validations.push(new index_1.RequiredFieldValidation(field));
    }
    const compareFieldValidation = new index_1.CompareFieldValidation('password', 'password_confirm');
    validations.push(compareFieldValidation);
    validations.push(new index_1.EmailValidation('email', new email_validator_adapter_1.EmailValidatorAdapter()));
    return new index_1.ValidationComposite(validations);
};
exports.makeSignUpValidation = makeSignUpValidation;
//# sourceMappingURL=signup-validation-factory.js.map