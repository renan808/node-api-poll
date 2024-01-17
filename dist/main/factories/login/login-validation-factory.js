"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeLoginValidation = void 0;
const index_1 = require("../../../presentation/helpers/validators/index");
const email_validator_adapter_1 = require("../../../utils/email-validator-adapter");
const makeLoginValidation = () => {
    const validations = [];
    for (const field of ['email', 'password']) {
        validations.push(new index_1.RequiredFieldValidation(field));
    }
    validations.push(new index_1.EmailValidation('email', new email_validator_adapter_1.EmailValidatorAdapter()));
    return new index_1.ValidationComposite(validations);
};
exports.makeLoginValidation = makeLoginValidation;
