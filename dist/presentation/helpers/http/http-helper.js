"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unauthorized = exports.ok = exports.serverError = exports.badRequest = void 0;
const server_error_1 = require("../../errors/server-error");
const unauthorized_error_1 = require("../../errors/unauthorized-error");
const badRequest = (error) => ({
    statuscode: 400,
    body: error
});
exports.badRequest = badRequest;
const serverError = (error) => {
    var _a;
    return ({
        statuscode: 500,
        body: new server_error_1.ServerError((_a = error.stack) !== null && _a !== void 0 ? _a : error.message)
    });
};
exports.serverError = serverError;
const ok = (data) => ({
    statuscode: 200,
    body: data
});
exports.ok = ok;
const unauthorized = () => ({
    statuscode: 401,
    body: new unauthorized_error_1.UnauthorizedError()
});
exports.unauthorized = unauthorized;
