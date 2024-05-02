"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerError = void 0;
class ServerError extends Error {
    constructor(stack) {
        super('Internal Server Error');
        this.name = 'ServerError';
        this.stack = stack !== null && stack !== void 0 ? stack : this.name;
    }
}
exports.ServerError = ServerError;
//# sourceMappingURL=server-error.js.map