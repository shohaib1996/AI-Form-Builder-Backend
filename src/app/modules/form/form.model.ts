import { Schema, model } from 'mongoose';
import { IForm } from './form.interface';

const formSchema = new Schema<IForm>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String },
    fields: { type: Schema.Types.Mixed, required: true, default: [] },
    isPublished: { type: Boolean, default: true },
    templateId: { type: String },
  },
  {
    timestamps: true,
  },
);

export const Form = model<IForm>('Form', formSchema);
