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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSingleResponse = exports.getResponses = exports.createResponse = void 0;
const response_model_1 = require("./response.model");
const createResponse = (formId, answers) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield response_model_1.ResponseModel.create({
        formId,
        answers,
        submittedAt: new Date(),
    });
    return response;
});
exports.createResponse = createResponse;
const getResponses = (formId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield response_model_1.ResponseModel.find({ formId }).sort({ submittedAt: -1 });
});
exports.getResponses = getResponses;
const getSingleResponse = (responseId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield response_model_1.ResponseModel.findById(responseId);
});
exports.getSingleResponse = getSingleResponse;
