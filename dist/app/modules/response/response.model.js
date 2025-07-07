"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseModel = void 0;
const mongoose_1 = require("mongoose");
const responseSchema = new mongoose_1.Schema({
    formId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Form',
        required: true,
    },
    answers: {
        type: Object,
        required: true,
    },
    submittedAt: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: false,
});
exports.ResponseModel = (0, mongoose_1.model)('Response', responseSchema);
