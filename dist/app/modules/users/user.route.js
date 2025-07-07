"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const user_validation_1 = require("./user.validation");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_1 = require("../../middlewares/auth");
const user_constant_1 = require("./user.constant");
const router = express_1.default.Router();
router.post('/signup', (0, validateRequest_1.default)(user_validation_1.signupSchema), user_controller_1.signup);
router.post('/signin', (0, validateRequest_1.default)(user_validation_1.signinSchema), user_controller_1.signin);
router.get('/me', (0, auth_1.auth)([user_constant_1.userRoles.USER, user_constant_1.userRoles.ADMIN]), user_controller_1.getUserData);
router.patch('/update/:id', (0, validateRequest_1.default)(user_validation_1.updateProfileSchema), user_controller_1.updateProfile);
router.post('/reset-password/:id', (0, validateRequest_1.default)(user_validation_1.resetPasswordSchema), user_controller_1.resetPassword);
exports.default = router;
