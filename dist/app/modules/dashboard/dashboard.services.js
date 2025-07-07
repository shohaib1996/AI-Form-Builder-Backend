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
exports.DashboardService = void 0;
const mongoose_1 = require("mongoose");
const form_model_1 = require("../form/form.model");
const response_model_1 = require("../response/response.model");
const getFormsPerMonth = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const formsPerMonth = yield form_model_1.Form.aggregate([
        { $match: { userId: new mongoose_1.Types.ObjectId(userId) } },
        {
            $group: {
                _id: { $month: '$createdAt' },
                count: { $sum: 1 },
            },
        },
        {
            $project: {
                month: '$_id',
                count: 1,
                _id: 0,
            },
        },
        { $sort: { month: 1 } },
    ]);
    // Convert month number to month name
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];
    return formsPerMonth.map((item) => ({
        month: months[item.month - 1],
        count: item.count,
    }));
});
const getResponsesOverTime = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const responsesOverTime = yield response_model_1.ResponseModel.aggregate([
        {
            $lookup: {
                from: 'forms',
                localField: 'formId',
                foreignField: '_id',
                as: 'form',
            },
        },
        { $unwind: '$form' },
        { $match: { 'form.userId': new mongoose_1.Types.ObjectId(userId) } },
        {
            $group: {
                _id: { $dateToString: { format: '%Y-%m-%d', date: '$submittedAt' } },
                count: { $sum: 1 },
            },
        },
        {
            $project: {
                date: '$_id',
                count: 1,
                _id: 0,
            },
        },
        { $sort: { date: 1 } },
    ]);
    return responsesOverTime;
});
const getResponsesByForm = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const responsesByForm = yield response_model_1.ResponseModel.aggregate([
        {
            $lookup: {
                from: 'forms',
                localField: 'formId',
                foreignField: '_id',
                as: 'form',
            },
        },
        { $unwind: '$form' },
        { $match: { 'form.userId': new mongoose_1.Types.ObjectId(userId) } },
        {
            $group: {
                _id: '$formId',
                formName: { $first: '$form.title' },
                count: { $sum: 1 },
            },
        },
        {
            $project: {
                formName: 1,
                count: 1,
                _id: 0,
            },
        },
    ]);
    return responsesByForm;
});
const getFormStatus = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const formStatus = yield form_model_1.Form.aggregate([
        { $match: { userId: new mongoose_1.Types.ObjectId(userId) } },
        {
            $group: {
                _id: '$isPublished',
                count: { $sum: 1 },
            },
        },
        {
            $project: {
                status: '$_id',
                count: 1,
                _id: 0,
            },
        },
    ]);
    return formStatus;
});
exports.DashboardService = {
    getFormsPerMonth,
    getResponsesOverTime,
    getResponsesByForm,
    getFormStatus,
};
