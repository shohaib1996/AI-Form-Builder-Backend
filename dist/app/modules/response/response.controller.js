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
exports.getSingleResponse = exports.getResponses = exports.submitResponse = void 0;
const ResponseService = __importStar(require("./response.services"));
const submitResponse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { formId } = req.params;
    const { answers } = req.body;
    try {
        // (Optional) validate form existence here if needed
        const newResponse = yield ResponseService.createResponse(formId, answers);
        res.status(201).json({ success: true, data: newResponse });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : 'Unknown error',
        });
    }
});
exports.submitResponse = submitResponse;
const getResponses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { formId } = req.params;
    try {
        const responses = yield ResponseService.getResponses(formId);
        res.status(200).json({ success: true, data: responses });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : 'Unknown error',
        });
    }
});
exports.getResponses = getResponses;
const getSingleResponse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { responseId } = req.params;
    try {
        const response = yield ResponseService.getSingleResponse(responseId);
        if (!response) {
            res.status(404).json({ success: false, message: 'Response not found' });
            return;
        }
        res.status(200).json({ success: true, data: response });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : 'Unknown error',
        });
    }
});
exports.getSingleResponse = getSingleResponse;
