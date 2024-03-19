"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcessDeniedError = void 0;
class AcessDeniedError extends Error {
    constructor() {
        super('Acess Denied');
        this.name = 'AcessDeniedError';
    }
}
exports.AcessDeniedError = AcessDeniedError;
//# sourceMappingURL=acess-denied-error.js.map