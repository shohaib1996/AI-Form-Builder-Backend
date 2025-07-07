"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const payment_controller_1 = require("./payment.controller");
const auth_1 = require("../../middlewares/auth");
const user_constant_1 = require("../users/user.constant");
const router = express_1.default.Router();
router.post('/checkout', (0, auth_1.auth)([user_constant_1.userRoles.USER, user_constant_1.userRoles.ADMIN]), payment_controller_1.checkout);
router.get('/complete', (0, auth_1.auth)([user_constant_1.userRoles.USER]), payment_controller_1.complete);
router.get('/cancel', payment_controller_1.cancel);
router.get('/subscription', (0, auth_1.auth)([user_constant_1.userRoles.ADMIN, user_constant_1.userRoles.USER]), payment_controller_1.getSubscription);
exports.default = router;
