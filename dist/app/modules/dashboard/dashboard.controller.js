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
exports.DashboardController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const dashboard_services_1 = require("./dashboard.services");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const getFormsPerMonth = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user || !req.user._id) {
        res
            .status(401)
            .json({ success: false, message: 'Unauthorized: User not found' });
        return;
    }
    const userId = req.user._id;
    const result = yield dashboard_services_1.DashboardService.getFormsPerMonth(userId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Forms per month fetched successfully',
        data: result,
    });
}));
const getResponsesOverTime = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user || !req.user._id) {
        res
            .status(401)
            .json({ success: false, message: 'Unauthorized: User not found' });
        return;
    }
    const userId = req.user._id;
    const result = yield dashboard_services_1.DashboardService.getResponsesOverTime(userId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Responses over time fetched successfully',
        data: result,
    });
}));
const getResponsesByForm = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user || !req.user._id) {
        res
            .status(401)
            .json({ success: false, message: 'Unauthorized: User not found' });
        return;
    }
    const userId = req.user._id;
    const result = yield dashboard_services_1.DashboardService.getResponsesByForm(userId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Responses by form fetched successfully',
        data: result,
    });
}));
const getFormStatus = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user || !req.user._id) {
        res
            .status(401)
            .json({ success: false, message: 'Unauthorized: User not found' });
        return;
    }
    const userId = req.user._id;
    const result = yield dashboard_services_1.DashboardService.getFormStatus(userId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Form status fetched successfully',
        data: result,
    });
}));
exports.DashboardController = {
    getFormsPerMonth,
    getResponsesOverTime,
    getResponsesByForm,
    getFormStatus,
};
