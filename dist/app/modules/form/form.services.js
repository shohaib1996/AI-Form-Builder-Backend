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
exports.togglePublishForm = exports.deleteForm = exports.updateForm = exports.getFormById = exports.getAllForms = exports.createForm = exports.generateFormFields = void 0;
const openai_1 = __importDefault(require("openai"));
const config_1 = __importDefault(require("../../config"));
const form_model_1 = require("./form.model");
const openai = new openai_1.default({
    apiKey: config_1.default.OPENAI_API_KEY,
    // baseURL: "https://api.deepseek.com/v1"
});
const generateFormFields = (prompt) => __awaiter(void 0, void 0, void 0, function* () {
    const aiPrompt = `Generate JSON field definitions for a form based on this description: "${prompt}". 
Each field should have name, label, type (text, email, number, select, etc.), and required (true/false) and don't generate any file fields rather than generate a text field where take the document link (e.g. "http://example.com/document.pdf") from user. For selecting options, provide an array of options.`;
    const response = yield openai.chat.completions.create({
        model: 'gpt-3.5-turbo', // or "o4-mini" if you have access
        messages: [
            {
                role: 'user',
                content: aiPrompt,
            },
        ],
    });
    const content = response.choices[0].message.content;
    let fields;
    try {
        fields = JSON.parse(content);
    }
    catch (error) {
        console.log(error);
        throw new Error('AI response could not be parsed as JSON');
    }
    return fields;
});
exports.generateFormFields = generateFormFields;
const createForm = (formData) => __awaiter(void 0, void 0, void 0, function* () {
    const form = yield form_model_1.Form.create(formData);
    return form;
});
exports.createForm = createForm;
const getAllForms = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const forms = yield form_model_1.Form.find({ userId }).sort({ createdAt: -1 });
    return forms;
});
exports.getAllForms = getAllForms;
const getFormById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const form = yield form_model_1.Form.findById(id);
    if (!form) {
        throw new Error('Form not found');
    }
    return form;
});
exports.getFormById = getFormById;
const updateForm = (id, formData) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedForm = yield form_model_1.Form.findByIdAndUpdate(id, formData, { new: true });
    if (!updatedForm) {
        throw new Error('Form not found');
    }
    return updatedForm;
});
exports.updateForm = updateForm;
const deleteForm = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedForm = yield form_model_1.Form.findByIdAndDelete(id);
    if (!deletedForm) {
        throw new Error('Form not found');
    }
    return deletedForm;
});
exports.deleteForm = deleteForm;
const togglePublishForm = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const form = yield form_model_1.Form.findById(id);
    if (!form) {
        throw new Error('Form not found');
    }
    form.isPublished = !form.isPublished;
    const updatedForm = yield form.save();
    return updatedForm;
});
exports.togglePublishForm = togglePublishForm;
