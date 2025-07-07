import { Schema, model } from 'mongoose';
import { IResponse } from './response.interface';

const responseSchema = new Schema<IResponse>(
  {
    formId: {
      type: Schema.Types.ObjectId,
      ref: 'Form',
      required: true,
    },
    answers: {
      type: Object,
      required: true,
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: false,
  },
);

export const ResponseModel = model<IResponse>('Response', responseSchema);
