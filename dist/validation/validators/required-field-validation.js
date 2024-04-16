"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequiredFieldValidation = void 0;
const errors_1 = require("@/presentation/errors");
class RequiredFieldValidation {
    constructor(FieldName) {
        this.FieldName = FieldName;
    }
    validate(input) {
        if (!input[this.FieldName]) {
            return new errors_1.MissingParamError(this.FieldName);
        }
        return null;
    }
}
exports.RequiredFieldValidation = RequiredFieldValidation;
//# sourceMappingURL=required-field-validation.js.map