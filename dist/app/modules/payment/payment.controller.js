"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubscription = exports.cancel = exports.complete = exports.checkout = void 0;
const PaymentService = __importStar(require("./payment.servies"));
const user_constant_1 = require("../users/user.constant");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const user_services_1 = require("../users/user.services");
const checkout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const items = req.body.items;
        if (!Array.isArray(items) || items.length === 0) {
            res.status(400).json({ success: false, message: 'Items are required' });
            return;
        }
        const session = yield PaymentService.createCheckoutSession(items);
        res.status(200).json({ success: true, url: session.url });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong while creating checkout session',
        });
    }
});
exports.checkout = checkout;
const complete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sessionId = req.query.session_id;
    try {
        const { session } = yield PaymentService.getCheckoutResult(sessionId);
        if (!req.user || !req.user._id) {
            res
                .status(401)
                .json({ success: false, message: 'Unauthorized: User not found' });
            return;
        }
        const userId = req.user._id;
        const planName = user_constant_1.userPlanTypes.PREMIUM;
        if (!userId) {
            res.status(400).json({ success: false, message: 'User ID not found' });
            return;
        }
        const subscription = {
            userId,
            planName,
            status: 'active',
            stripeSubscriptionId: typeof session.subscription === 'string'
                ? session.subscription
                : session.subscription && session.subscription.id
                    ? session.subscription.id
                    : session.id,
            startedAt: new Date(),
            endsAt: new Date(new Date().setMonth(new Date().getMonth() + 1)),
        };
        yield PaymentService.addSubscription(subscription);
        yield (0, user_services_1.updateProfileService)(userId, { planType: user_constant_1.userPlanTypes.PREMIUM });
        res.status(200).json({
            success: true,
            message: 'Your payment was successful and subscription is now active!',
            subscription: {
                planName: subscription.planName,
                status: subscription.status,
                startedAt: subscription.startedAt,
                endsAt: subscription.endsAt,
                stripeSubscriptionId: subscription.stripeSubscriptionId,
            },
        });
    }
    catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ success: false, message: 'Error retrieving payment result' });
    }
});
exports.complete = complete;
const cancel = (_req, res) => {
    res.redirect('/pricing');
};
exports.cancel = cancel;
exports.getSubscription = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user || !req.user._id) {
            res
                .status(401)
                .json({ success: false, message: 'Unauthorized: user not found' });
            return;
        }
        const userId = req.user._id;
        const subscriptions = yield PaymentService.getSubscriptionByUserId(userId);
        res.status(200).json({ success: true, data: subscriptions });
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving subscriptions');
    }
}));
