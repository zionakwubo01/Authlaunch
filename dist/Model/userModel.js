"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userModel = new mongoose_1.Schema({
    email: {
        type: String
    },
    password: {
        type: String
    },
    verify: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        default: "user"
    },
    verifyToken: {
        type: String
    },
});
exports.default = (0, mongoose_1.model)("user", userModel);
