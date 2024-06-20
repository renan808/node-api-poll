"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockValidation = void 0;
const mockValidation = () => {
    class ValidationStub {
        validate(input) {
            return null;
        }
    }
    const validationStub = new ValidationStub();
    return validationStub;
};
exports.mockValidation = mockValidation;
//# sourceMappingURL=mock-validation.js.map