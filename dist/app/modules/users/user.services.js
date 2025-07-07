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
exports.findOrCreateGoogleUser = exports.resetPasswordService = exports.updateProfileService = exports.getUserDataService = exports.signinService = exports.signupService = void 0;
const user_model_1 = require("./user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const generateToken_1 = require("../../utils/generateToken");
const ApiError_1 = require("../../errors/ApiError");
const signupService = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.create(userData);
    return user;
});
exports.signupService = signupService;
const signinService = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ email });
    if (!user)
        throw new ApiError_1.ApiError(404, 'User not found');
    const isMatch = yield bcrypt_1.default.compare(password, user.password);
    if (!isMatch)
        throw new ApiError_1.ApiError(401, 'Invalid credentials');
    const token = (0, generateToken_1.generateToken)(user);
    return { user, token };
});
exports.signinService = signinService;
const getUserDataService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(id);
    return user;
});
exports.getUserDataService = getUserDataService;
const updateProfileService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    if (data.password) {
        data.password = yield bcrypt_1.default.hash(data.password, 10);
    }
    const updatedUser = yield user_model_1.User.findByIdAndUpdate(id, data, { new: true });
    return updatedUser;
});
exports.updateProfileService = updateProfileService;
const resetPasswordService = (id, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const hashed = yield bcrypt_1.default.hash(newPassword, 10);
    const user = yield user_model_1.User.findByIdAndUpdate(id, { password: hashed }, { new: true });
    return user;
});
exports.resetPasswordService = resetPasswordService;
const findOrCreateGoogleUser = (profile) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield user_model_1.User.findOne({ email: profile.email });
    if (!user) {
        user = yield user_model_1.User.create({
            name: profile.name,
            email: profile.email,
            photo: profile.picture || '',
        });
    }
    return user;
});
exports.findOrCreateGoogleUser = findOrCreateGoogleUser;
