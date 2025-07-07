"use strict";
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
exports.getSubscriptionByUserId = exports.addSubscription = exports.getCheckoutResult = exports.createCheckoutSession = void 0;
const config_1 = __importDefault(require("../../config"));
const stripe_1 = __importDefault(require("../../utils/stripe"));
const subscription_model_1 = require("./subscription.model");
const createCheckoutSession = (items) => __awaiter(void 0, void 0, void 0, function* () {
    const line_items = items.map((item) => ({
        price_data: {
            currency: item.currency,
            product_data: {
                name: item.name,
            },
            unit_amount: item.amount * 100,
        },
        quantity: item.quantity,
    }));
    const session = yield stripe_1.default.checkout.sessions.create({
        line_items,
        mode: 'payment',
        shipping_address_collection: {
            allowed_countries: config_1.default.ALLOWED_COUNTRIES,
        },
        success_url: `${config_1.default.BASE_URL}/complete?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${config_1.default.BASE_URL}/cancel`,
    });
    return session;
});
exports.createCheckoutSession = createCheckoutSession;
const getCheckoutResult = (sessionId) => __awaiter(void 0, void 0, void 0, function* () {
    const sessionPromise = stripe_1.default.checkout.sessions.retrieve(sessionId, {
        expand: ['payment_intent.payment_method'],
    });
    const lineItemsPromise = stripe_1.default.checkout.sessions.listLineItems(sessionId);
    const [session, lineItems] = yield Promise.all([
        sessionPromise,
        lineItemsPromise,
    ]);
    return { session, lineItems };
});
exports.getCheckoutResult = getCheckoutResult;
const addSubscription = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const subscription = new subscription_model_1.Subscription({
        userId: data.userId,
        planName: data.planName,
        status: data.status,
        stripeSubscriptionId: data.stripeSubscriptionId,
        startedAt: data.startedAt,
        endsAt: data.endsAt,
    });
    yield subscription.save();
    return subscription;
});
exports.addSubscription = addSubscription;
const getSubscriptionByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const subscriptions = yield subscription_model_1.Subscription.find({ userId });
    return subscriptions;
});
exports.getSubscriptionByUserId = getSubscriptionByUserId;
