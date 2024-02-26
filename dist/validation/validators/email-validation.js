"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailValidation = void 0;
const errors_1 = require("../../presentation/errors");
class EmailValidation {
    constructor(FieldName, EmailValidator) {
        this.FieldName = FieldName;
        this.EmailValidator = EmailValidator;
    }
    validate(input) {
        const isValid = this.EmailValidator.isValid(input[this.FieldName]);
        if (!isValid) {
            return new errors_1.InvalidParamError(this.FieldName);
        }
    }
}
exports.EmailValidation = EmailValidation;
//# sourceMappingURL=email-validation.js.map