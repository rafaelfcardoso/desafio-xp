"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const httpErrorMiddleware = (err, req, res, _next) => {
    console.log('httpErrorMiddleware');
    const { status, message } = err;
    return res
        .status(status || 500)
        .json({ message });
};
exports.default = httpErrorMiddleware;
