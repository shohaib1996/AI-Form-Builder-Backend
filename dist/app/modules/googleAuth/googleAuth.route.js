"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/app/modules/Auth/GoogleAuth/googleAuth.route.ts
const express_1 = __importDefault(require("express"));
const googleAuth_controller_1 = require("./googleAuth.controller");
const router = express_1.default.Router();
// Route to initiate Google OAuth login
router.get('/google', googleAuth_controller_1.GoogleAuthController.googleLogin);
// Google OAuth callback route
router.get('/google/callback', googleAuth_controller_1.GoogleAuthController.googleCallback, googleAuth_controller_1.GoogleAuthController.googleCallbackRedirect);
// Logout for social login (if you want a separate one or a unified logout)
router.get('/logout', googleAuth_controller_1.GoogleAuthController.logout);
exports.default = router;
