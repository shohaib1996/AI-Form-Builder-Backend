"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = __importDefault(require("./../modules/users/user.route"));
const form_route_1 = __importDefault(require("./../modules/form/form.route"));
const response_routes_1 = __importDefault(require("./../modules/response/response.routes"));
const payment_routes_1 = __importDefault(require("./../modules/payment/payment.routes"));
const dashboard_route_1 = __importDefault(require("../modules/dashboard/dashboard.route"));
const googleAuth_route_1 = __importDefault(require("../modules/googleAuth/googleAuth.route"));
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/dashboard',
        route: dashboard_route_1.default,
    },
    {
        path: '/auth',
        route: user_route_1.default,
    },
    {
        path: '/form',
        route: form_route_1.default,
    },
    {
        path: '/response',
        route: response_routes_1.default,
    },
    {
        path: '/payment',
        route: payment_routes_1.default,
    },
    {
        path: '/auth',
        route: googleAuth_route_1.default,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
