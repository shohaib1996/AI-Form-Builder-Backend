"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const form_controller_1 = require("./form.controller");
const form_validation_1 = require("./form.validation");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_1 = require("../../middlewares/auth");
const user_constant_1 = require("../users/user.constant");
const router = express_1.default.Router();
// Create form manually
// router.post('/', auth(), validateRequest(formValidationSchema), createForm);
// Create form using AI
router.post('/ai', (0, auth_1.auth)([user_constant_1.userRoles.ADMIN, user_constant_1.userRoles.USER]), (0, validateRequest_1.default)(form_validation_1.aiFormSchema), form_controller_1.createFormWithAI);
// Get all forms (of current user)
router.get('/', (0, auth_1.auth)([user_constant_1.userRoles.ADMIN, user_constant_1.userRoles.USER]), form_controller_1.getAllForms);
// Get single form by id
router.get('/:id', (0, auth_1.auth)([user_constant_1.userRoles.ADMIN, user_constant_1.userRoles.USER]), form_controller_1.getFormById);
// Update form
router.patch('/:id', (0, auth_1.auth)([user_constant_1.userRoles.ADMIN, user_constant_1.userRoles.USER]), (0, validateRequest_1.default)(form_validation_1.formValidationSchema), form_controller_1.updateForm);
// Toggle publish/unpublish form
router.patch('/:id/publish', (0, auth_1.auth)([user_constant_1.userRoles.ADMIN, user_constant_1.userRoles.USER]), form_controller_1.togglePublishForm);
// Delete form
router.delete('/:id', (0, auth_1.auth)([user_constant_1.userRoles.ADMIN, user_constant_1.userRoles.USER]), form_controller_1.deleteForm);
exports.default = router;
