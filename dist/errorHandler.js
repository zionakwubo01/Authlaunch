"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const Mainerror_1 = require("./Mainerror");
const viewError = (err, res) => {
    try {
        return res.status(Mainerror_1.HTTP.BAD).json({
            name: err.name,
            message: err.message,
            status: err.status,
            success: err.success,
            err: err.stack
        });
    }
    catch (error) {
        return error;
    }
};
const errorHandler = (err, req, res, next) => {
    try {
        return viewError(err, res);
    }
    catch (error) {
        return error;
    }
};
exports.errorHandler = errorHandler;
