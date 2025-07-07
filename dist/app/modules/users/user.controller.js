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
exports.resetPassword = exports.updateProfile = exports.getUserData = exports.signin = exports.signup = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const user_services_1 = require("./user.services");
exports.signup = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, user_services_1.signupService)(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'Signup successful',
        data: user,
    });
}));
exports.signin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const { user, token } = yield (0, user_services_1.signinService)(email, password);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Signin successful',
        data: { user, token },
    });
}));
exports.getUserData = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user || !req.user._id) {
        res
            .status(401)
            .json({ success: false, message: 'Unauthorized: User not found' });
        return;
    }
    const userId = req.user._id;
    const userInfo = yield (0, user_services_1.getUserDataService)(userId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'User Info retrieve',
        data: userInfo,
    });
}));
exports.updateProfile = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const updated = yield (0, user_services_1.updateProfileService)(userId, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Profile updated',
        data: updated,
    });
}));
exports.resetPassword = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const { password } = req.body;
    const updated = yield (0, user_services_1.resetPasswordService)(userId, password);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Password reset successful',
        data: updated,
    });
}));
// Forgot password: You can add logic to send an email with a reset link/token.
// For simplicity, not included here.
