"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompareFieldValidation = void 0;
const errors_1 = require("@/presentation/errors");
class CompareFieldValidation {
    constructor(FieldName, FieldToCompareName) {
        this.FieldName = FieldName;
        this.FieldToCompareName = FieldToCompareName;
    }
    validate(input) {
        if (input[this.FieldName] !== input[this.FieldToCompareName]) {
            return new errors_1.InvalidParamError(this.FieldToCompareName);
        }
        return null;
    }
}
exports.CompareFieldValidation = CompareFieldValidation;
//# sourceMappingURL=compare-fields-validation.js.map