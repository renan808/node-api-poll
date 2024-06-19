"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forbidden = void 0;
exports.forbidden = {
    description: 'Forbidden',
    content: {
        'application/json': {
            schema: {
                $ref: '#/schemas/error'
            }
        }
    }
};
//# sourceMappingURL=forbidden.js.map