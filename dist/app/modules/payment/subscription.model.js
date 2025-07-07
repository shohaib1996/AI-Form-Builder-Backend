"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subscription = void 0;
const mongoose_1 = require("mongoose");
const subscriptionSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    planName: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['active', 'canceled', 'expired', 'trialing'],
        default: 'active',
    },
    stripeSubscriptionId: {
        type: String,
        required: true,
    },
    startedAt: {
        type: Date,
        required: true,
    },
    endsAt: {
        type: Date,
        default: null,
    },
}, { timestamps: true });
exports.Subscription = (0, mongoose_1.model)('Subscription', subscriptionSchema);
