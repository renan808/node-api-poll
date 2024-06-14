"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockEmailvalidator = void 0;
const mockEmailvalidator = () => {
    class EmailValidatorStub {
        isValid(email) {
            return true;
        }
    }
    return new EmailValidatorStub();
};
exports.mockEmailvalidator = mockEmailvalidator;
//# sourceMappingURL=mock-email-validator.js.map