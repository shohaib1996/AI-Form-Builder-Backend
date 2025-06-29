import { Types } from 'mongoose';

export interface IForm {
  _id?: Types.ObjectId;
  userId: Types.ObjectId;
  title: string;
  description?: string;
  fields: any[];
  isPublished?: boolean;
  templateId?: string;
}