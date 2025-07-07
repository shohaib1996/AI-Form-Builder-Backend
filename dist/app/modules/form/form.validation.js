"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aiFormSchema = exports.formValidationSchema = void 0;
const zod_1 = require("zod");
exports.formValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string({
            required_error: 'User ID is required',
        }),
        title: zod_1.z.string({
            required_error: 'Title is required',
        }),
        description: zod_1.z.string().optional(),
        fields: zod_1.z.array(zod_1.z.any(), {
            required_error: 'Fields are required',
        }),
        isPublished: zod_1.z.boolean().optional(),
        templateId: zod_1.z.string().optional(),
    }),
});
exports.aiFormSchema = zod_1.z.object({
    body: zod_1.z.object({
        prompt: zod_1.z.string().min(10, 'Prompt must be at least 10 characters'),
        title: zod_1.z.string().min(3),
        description: zod_1.z.string().optional(),
    }),
});
