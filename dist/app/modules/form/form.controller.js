"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteForm = exports.togglePublishForm = exports.updateForm = exports.getFormById = exports.getAllForms = exports.createFormWithAI = void 0;
const FormService = __importStar(require("./form.services"));
// Extend Express Request interface to include 'user'
const createFormWithAI = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { prompt, title, description } = req.body;
    if (!req.user || !req.user._id) {
        res
            .status(401)
            .json({ success: false, message: 'Unauthorized: User not found' });
        return;
    }
    const userId = req.user._id;
    try {
        const fields = yield FormService.generateFormFields(prompt);
        const form = yield FormService.createForm({
            userId,
            title,
            description,
            fields,
            isPublished: true,
            templateId: 'ai-generated-template',
        });
        res.status(201).json({ success: true, data: form });
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(500).json({ success: false, message: errorMessage });
    }
});
exports.createFormWithAI = createFormWithAI;
const getAllForms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user || !req.user._id) {
        res
            .status(401)
            .json({ success: false, message: 'Unauthorized: User not found' });
        return;
    }
    const userId = req.user._id;
    try {
        const forms = yield FormService.getAllForms(userId);
        res.status(200).json({ success: true, data: forms });
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(500).json({ success: false, message: errorMessage });
    }
});
exports.getAllForms = getAllForms;
const getFormById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const form = yield FormService.getFormById(id);
        if (!form) {
            res.status(404).json({ success: false, message: 'Form not found' });
            return;
        }
        res.status(200).json({ success: true, data: form });
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(500).json({ success: false, message: errorMessage });
    }
});
exports.getFormById = getFormById;
const updateForm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const formData = req.body;
    try {
        const updatedForm = yield FormService.updateForm(id, formData);
        if (!updatedForm) {
            res.status(404).json({ success: false, message: 'Form not found' });
            return;
        }
        res.status(200).json({ success: true, data: updatedForm });
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(500).json({ success: false, message: errorMessage });
    }
});
exports.updateForm = updateForm;
const togglePublishForm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const updatedForm = yield FormService.togglePublishForm(id);
        if (!updatedForm) {
            res.status(404).json({ success: false, message: 'Form not found' });
            return;
        }
        res.status(200).json({ success: true, data: updatedForm });
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(500).json({ success: false, message: errorMessage });
    }
});
exports.togglePublishForm = togglePublishForm;
const deleteForm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedForm = yield FormService.deleteForm(id);
        if (!deletedForm) {
            res.status(404).json({ success: false, message: 'Form not found' });
            return;
        }
        res.status(200).json({ success: true, data: deletedForm });
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(500).json({ success: false, message: errorMessage });
    }
});
exports.deleteForm = deleteForm;
