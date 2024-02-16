"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    mongoUrl: 'mongodb://localhost:27017' || global.__MONGO_URI__,
    port: (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 5050,
    salt: 12,
    jwtSecret: (_b = process.env.JWT_SECRET) !== null && _b !== void 0 ? _b : 'secret_key'
};
//# sourceMappingURL=env.js.map