"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const response_controller_1 = require("./response.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const response_validation_1 = require("./response.validation");
const router = express_1.default.Router();
// Submit new response
router.post('/:formId/responses', (0, validateRequest_1.default)(response_validation_1.submitResponseSchema), response_controller_1.submitResponse);
// Get all responses for a form
router.get('/:formId/responses', response_controller_1.getResponses);
// Get single response by ID
router.get('/single/:responseId', response_controller_1.getSingleResponse);
exports.default = router;
