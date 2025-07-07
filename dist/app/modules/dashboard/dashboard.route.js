"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dashboard_controller_1 = require("./dashboard.controller");
const user_constant_1 = require("../users/user.constant");
const auth_1 = require("../../middlewares/auth");
const router = express_1.default.Router();
router.get('/forms-per-month', (0, auth_1.auth)([user_constant_1.userRoles.ADMIN, user_constant_1.userRoles.USER]), dashboard_controller_1.DashboardController.getFormsPerMonth);
router.get('/responses-over-time', (0, auth_1.auth)([user_constant_1.userRoles.ADMIN, user_constant_1.userRoles.USER]), dashboard_controller_1.DashboardController.getResponsesOverTime);
router.get('/responses-by-form', (0, auth_1.auth)([user_constant_1.userRoles.ADMIN, user_constant_1.userRoles.USER]), dashboard_controller_1.DashboardController.getResponsesByForm);
router.get('/form-status', (0, auth_1.auth)([user_constant_1.userRoles.ADMIN, user_constant_1.userRoles.USER]), dashboard_controller_1.DashboardController.getFormStatus);
exports.default = router;
