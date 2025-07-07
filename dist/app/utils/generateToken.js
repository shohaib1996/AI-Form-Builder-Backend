"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const generateToken = (user) => {
    return jsonwebtoken_1.default.sign({ user }, config_1.default.JWT_SECRET, {
        expiresIn: '7d',
    });
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, config_1.default.JWT_SECRET);
    }
    catch (error) {
        console.log(error);
        return null;
    }
};
exports.verifyToken = verifyToken;
