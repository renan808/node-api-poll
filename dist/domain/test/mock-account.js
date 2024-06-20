"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockAccountModel = exports.mockAddAccountParams = void 0;
const mockAddAccountParams = () => ({
    name: 'any_name',
    email: 'any_email@email.com',
    password: 'any_password'
});
exports.mockAddAccountParams = mockAddAccountParams;
const mockAccountModel = () => ({
    id: 'any_id',
    email: 'any_email@email.com',
    name: 'any_name',
    password: 'hashed_password',
    role: 'admin'
});
exports.mockAccountModel = mockAccountModel;
//# sourceMappingURL=mock-account.js.map