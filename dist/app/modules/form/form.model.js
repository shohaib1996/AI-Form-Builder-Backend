"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Form = void 0;
const mongoose_1 = require("mongoose");
const formSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String },
    fields: { type: mongoose_1.Schema.Types.Mixed, required: true, default: [] },
    isPublished: { type: Boolean, default: true },
    templateId: { type: String },
}, {
    timestamps: true,
});
exports.Form = (0, mongoose_1.model)('Form', formSchema);
