"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const JWT_SECRET = config_1.default.JWT_SECRET || 'your_jwt_secret';
const auth = (roles = []) => {
    // console.log("roles", roles);
    return (req, res, next) => {
        const authHeader = req.headers.authorization;
        // console.log("authHeader", authHeader);
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({ message: 'No token provided' });
            return;
        }
        const token = authHeader.split(' ')[1];
        try {
            const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
            req.user = decoded.user;
            if (roles.length &&
                (!req.user || !req.user.role || !roles.includes(req.user.role))) {
                res.status(403).json({ message: 'Forbidden: Insufficient role' });
                return;
            }
            next();
        }
        catch (err) {
            console.log(err);
            res.status(401).json({ message: 'Invalid token' });
            return;
        }
    };
};
exports.auth = auth;
