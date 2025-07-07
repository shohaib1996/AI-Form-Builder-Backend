"use strict";
// src/app/modules/Auth/GoogleAuth/googleAuth.controller.ts
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
exports.GoogleAuthController = void 0;
const google_auth_library_1 = require("google-auth-library");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const config_1 = __importDefault(require("../../config"));
const user_services_1 = require("../../modules/users/user.services");
const generateToken_1 = require("../../utils/generateToken");
const oAuth2Client = new google_auth_library_1.OAuth2Client(config_1.default.GOOGLE_CLIENT_ID, config_1.default.GOOGLE_CLIENT_SECRET, config_1.default.GOOGLE_CALLBACK_URL);
exports.GoogleAuthController = {
    googleLogin: (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const authorizeUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: ['profile', 'email', 'openid'],
            prompt: 'consent',
        });
        res.redirect(authorizeUrl);
    })),
    googleCallback: (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const code = req.query.code;
        if (!code) {
            console.error('Google OAuth callback: No authorization code received.');
            return res.redirect('http://localhost:3000/login?error=access_denied');
        }
        try {
            const { tokens } = yield oAuth2Client.getToken(code);
            oAuth2Client.setCredentials(tokens);
            const userInfoResponse = yield oAuth2Client.request({
                url: 'https://www.googleapis.com/oauth2/v3/userinfo',
            });
            const userProfile = userInfoResponse.data;
            // Find or create user in your database
            const user = yield (0, user_services_1.findOrCreateGoogleUser)({
                email: userProfile.email,
                name: userProfile.name,
                picture: userProfile.picture,
            });
            // Generate JWT token
            const token = (0, generateToken_1.generateToken)(user);
            req.session = req.session || {};
            req.session.user = {
                id: user._id.toString(),
                name: user.name,
                email: user.email,
                picture: user.photo,
                accessToken: tokens.access_token,
                refreshToken: tokens.refresh_token,
            };
            req.session.token = token; // Store token in session
            next(); // Proceed to googleCallbackRedirect
        }
        catch (error) {
            console.error('Error during Google OAuth callback:', error);
            (0, sendResponse_1.default)(res, {
                statusCode: 500,
                success: false,
                message: 'Google Sign-In Failed',
            });
        }
    })),
    googleCallbackRedirect: (req, res) => {
        var _a;
        if (((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) && req.session.token) {
            console.log('Google login successful. Redirecting browser to frontend: http://localhost:3000');
            // Redirect with token in query parameter
            res.redirect(`http://localhost:3000/google-redirect?token=${req.session.token}`);
        }
        else {
            console.log('Google login failed after callback. Redirecting to frontend error page: http://localhost:3000/login?error=auth_failed_redirect');
            res.redirect('http://localhost:3000/login?error=auth_failed_redirect');
        }
    },
    logout: (req, res) => {
        req.session = null;
        res.redirect('http://localhost:3000/signin');
    },
    ensureAuthenticated: (req, res, next) => {
        var _a;
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            return next();
        }
        (0, sendResponse_1.default)(res, {
            statusCode: 401,
            success: false,
            message: 'Unauthorized: Please log in.',
        });
    },
};
