"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitResponseSchema = void 0;
const zod_1 = require("zod");
exports.submitResponseSchema = zod_1.z.object({
    body: zod_1.z.object({
        answers: zod_1.z
            .record(zod_1.z.any(), zod_1.z.any())
            .refine((val) => Object.keys(val).length > 0, {
            message: 'Answers are required',
        }),
    }),
});
