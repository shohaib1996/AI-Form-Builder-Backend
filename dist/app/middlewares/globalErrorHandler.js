"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const ApiError_1 = require("../errors/ApiError");
const globalErrorHandler = (err, req, res) => {
    if (err instanceof ApiError_1.ApiError) {
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
        });
        return;
    }
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: (err === null || err === void 0 ? void 0 : err.message) || err,
    });
};
exports.globalErrorHandler = globalErrorHandler;
