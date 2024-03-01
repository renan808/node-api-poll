"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationComposite = void 0;
class ValidationComposite {
    constructor(Validations) {
        this.Validations = Validations;
    }
    validate(input) {
        for (const validation of this.Validations) {
            const error = validation.validate(input);
            if (error) {
                return error;
            }
        }
        return null;
    }
}
exports.ValidationComposite = ValidationComposite;
//# sourceMappingURL=validation-composite.js.map